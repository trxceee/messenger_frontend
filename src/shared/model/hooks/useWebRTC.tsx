"use client";

import { useEffect, useRef } from "react";
import { useSocketConnection } from "./useSocketConnection";
import { useAppDispatch, useAppSelector } from "@/app";
import { changeCallStatus, getMyDms, setCurrentChat } from "@/entities";

export function useWebRTC(
  userId: string,
  chatId: string,
  targetUserId: string,
) {
  const dispatch = useAppDispatch();
  const socketApi = useSocketConnection(userId);
  const dms = useAppSelector(getMyDms);

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection>(null);
  const targetUserIdRef = useRef(targetUserId);
  const dmsRef = useRef(dms);
  const isCallActiveRef = useRef(false);

  useEffect(() => {
    targetUserIdRef.current = targetUserId;
  }, [targetUserId]);

  useEffect(() => {
    dmsRef.current = dms;
  }, [dms]);

  const peerConfiguration: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  const createPeerConnection = () => {
    const connection = new RTCPeerConnection(peerConfiguration);
    peerConnectionRef.current = connection;

    connection.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    connection.onicecandidate = (e) => {
      if (e.candidate) {
        socketApi.emit("iceCandidate", {
          targetUserId: targetUserIdRef.current,
          candidate: e.candidate,
        });
      }
    };

    return connection;
  };

  const getUserMediaDate = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = mediaStream;
    }
    return mediaStream;
  };

  const stopStream = () => {
    peerConnectionRef.current?.getSenders().forEach((sender) => sender.track?.stop());
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
  };

  const closeCall = async () => {
    if (!isCallActiveRef.current) return;
    isCallActiveRef.current = false;
    socketApi.emit("closeCall", { targetUserId: targetUserIdRef.current });
    dispatch(changeCallStatus({ data: { data: null, userId }, status: "closed" }));
    stopStream();
  };

  const createOffer = async () => {
    isCallActiveRef.current = true;

    let conn = peerConnectionRef.current;
    if (!conn || conn.signalingState === "closed") {
      conn = createPeerConnection();
    }

    dispatch(changeCallStatus({ data: { data: null, userId }, status: "offer" }));
    const mediaStream = await getUserMediaDate();

    if (!peerConnectionRef.current || peerConnectionRef.current.signalingState === "closed") {
      mediaStream.getTracks().forEach((track) => track.stop());
      return;
    }

    mediaStream.getTracks().forEach((track) => conn.addTrack(track, mediaStream));

    const offer = await conn.createOffer();
    conn.setLocalDescription(offer);

    socketApi.emit("callOffer", { targetUserId: targetUserIdRef.current, chatId, offer });
    dispatch(changeCallStatus({ data: { data: offer, userId }, status: "offer" }));
  };

  const createAnswer = async (
    description: RTCSessionDescriptionInit,
    callerUserId: string,
  ) => {
    isCallActiveRef.current = true;

    const existingConn = peerConnectionRef.current;
    if (existingConn && existingConn.signalingState !== "closed") {
      existingConn.close();
    }

    const conn = createPeerConnection();
    dispatch(changeCallStatus({ data: { data: description, userId }, status: "active" }));

    const mediaStream = await getUserMediaDate();
    mediaStream.getTracks().forEach((track) => conn.addTrack(track, mediaStream));

    conn.setRemoteDescription(description);

    const answer = await conn.createAnswer();
    conn.setLocalDescription(answer);

    socketApi.emit("callAnswer", { targetUserId: callerUserId, answer });
  };

  const onIceCandidate = async (candidate: RTCIceCandidateInit) => {
    const conn = peerConnectionRef.current;
    if (conn) conn.addIceCandidate(candidate);
  };

  const onAnswer = (answer: RTCSessionDescriptionInit) => {
    peerConnectionRef.current?.setRemoteDescription(answer);
    dispatch(changeCallStatus({ data: { data: answer, userId }, status: "active" }));
  };

  useEffect(() => {
    const handleOffer = async (data: {
      data: RTCSessionDescriptionInit;
      userId: string;
      chatId: string;
    }) => {
      isCallActiveRef.current = true;
      dispatch(
        changeCallStatus({
          data: { data: data.data, userId: data.userId },
          status: "offer",
        }),
      );

      const chat = dmsRef.current.find((dm) => dm.id === data.chatId);
      if (chat) dispatch(setCurrentChat(chat));
    };

    const handleAnswer = async (data: RTCSessionDescriptionInit) => onAnswer(data);
    const handleIceCandidate = async (candidate: RTCIceCandidateInit) => onIceCandidate(candidate);

    socketApi.on("call:offer", handleOffer);
    socketApi.on("call:answer", handleAnswer);
    socketApi.on("call:ice-candidate", handleIceCandidate);
    socketApi.on("call:on-closing", closeCall);

    return () => {
      socketApi.off("call:offer", handleOffer);
      socketApi.off("call:answer", handleAnswer);
      socketApi.off("call:ice-candidate", handleIceCandidate);
      socketApi.off("call:on-closing", closeCall);
    };
  }, []);

  return {
    createOffer,
    closeCall,
    localVideoRef,
    remoteVideoRef,
    createAnswer,
  };
}
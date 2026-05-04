"use client"

import { useEffect, useRef } from "react";
import { useSocketConnection } from "./useSocketConnection";

export function useWebRTC(userId: string, chatId: string) {
  const socketApi = useSocketConnection(userId);

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const peerConnectionRef = useRef<RTCPeerConnection>(null);

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
        socketApi.emit("iceCandidate", { chatId, candidate: e.candidate });
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

  const createOffer = async () => {
    let conn = peerConnectionRef.current;
    if (!conn) {
      conn = await createPeerConnection();
    }

    const mediaStream = await getUserMediaDate();

    mediaStream
      .getTracks()
      .forEach((track) => conn.addTrack(track, mediaStream));

    const offer = await conn.createOffer();
    conn.setLocalDescription(offer);

    socketApi.emit("callOffer", { chatId: chatId, offer });
  };

  const closeCall = async () => {
    socketApi.emit("closeCall", { chatId });
  };

  const createAnswer = async (description: RTCSessionDescriptionInit) => {
    const conn = createPeerConnection();
    const mediaStream = await getUserMediaDate();

    mediaStream
      .getTracks()
      .forEach((track) => conn.addTrack(track, mediaStream));

    conn.setRemoteDescription(description);

    const answer = await conn.createAnswer();
    conn.setLocalDescription(answer);

    socketApi.emit("callAnswer", { chatId: chatId, answer });
  };

  // листенеры
  const onIceCandidate = async (candidate: RTCIceCandidateInit) => {
    const conn = peerConnectionRef.current;
    if (conn) conn.addIceCandidate(candidate);
  };

  const onClosing = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
  };

  const onAnswer = (answer: RTCSessionDescriptionInit) => {
    peerConnectionRef.current?.setRemoteDescription(answer);
  };

  useEffect(() => {
    const handleOffer = async (data: RTCSessionDescriptionInit) =>
      await createAnswer(data);
    const handleAnswer = async (data: RTCSessionDescriptionInit) =>
      await onAnswer(data);
    const handleIceCandidate = async (candidate: RTCIceCandidateInit) =>
      await onIceCandidate(candidate);

    socketApi.on("call:offer", handleOffer);
    socketApi.on("call:answer", handleAnswer);
    socketApi.on("call:ice-candidate", handleIceCandidate);
    socketApi.on("call:on-closing", onClosing);

    return () => {
      socketApi.off("call:offer", handleOffer);
      socketApi.off("call:answer", handleAnswer);
      socketApi.off("call:ice-candidate", handleIceCandidate);
      socketApi.off("call:on-closing", onClosing);
    };
  }, []);

  return { createOffer, closeCall, localVideoRef, remoteVideoRef };
}

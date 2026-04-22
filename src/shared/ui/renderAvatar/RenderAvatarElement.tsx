"use client";

import Image from "next/image";
import { FC } from "react";

interface IRenderAvatarElement {
  hasAvatar: boolean;
  avatar?: string;
  size: number;
}

const RenderAvatarElement: FC<IRenderAvatarElement> = ({
  hasAvatar,
  size,
  avatar,
}) => {
  return (
    <>
      {hasAvatar ? (
        <Image
          src={avatar ?? ""}
          alt={"avatar"}
          width={size}
          loading="lazy"
          height={size}
          className="rounded-full select-none object-cover aspect-square shrink-0"
        />
      ) : (
        <div
          style={{ width: size }}
          className="relative flex flex-col items-center justify-center shrink-0"
        >
          <div
            style={{ width: size }}
            className="aspect-square bg-linear-190 from-accent to-accent/20 rounded-full"
          ></div>
        </div>
      )}
    </>
  );
};

export default RenderAvatarElement;

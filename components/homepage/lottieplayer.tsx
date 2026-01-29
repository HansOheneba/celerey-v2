"use client";

import Lottie from "lottie-react";

type LottiePlayerProps = {
  animationData: any;
  className?: string;
  loop?: boolean;
};

export default function LottiePlayer({
  animationData,
  className,
  loop = true,
}: LottiePlayerProps) {
  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

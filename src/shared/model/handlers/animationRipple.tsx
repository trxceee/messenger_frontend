import { MouseEvent } from "react";

export const createRipple = (e: MouseEvent<HTMLDivElement>) => {
  const button = e.currentTarget;
  const circle = document.createElement("span");
  const rect = button.getBoundingClientRect();

  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.className =
    "absolute bg-ripple rounded-full pointer-events-none ripple";

  button.appendChild(circle);

  circle.addEventListener("animationend", () => {
    circle.remove();
  });
};

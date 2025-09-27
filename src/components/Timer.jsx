import React from "react";

export default function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="font-bold text-red-500">
      Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
    </p>
  );
}

import React from "react";

const Arrow = ({ startX, startY, endX, endY }) => {
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <svg
      style={{
        position: "absolute",
        left: startX,
        top: startY,
        width: length,
        height: 10,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <polygon points="0,0 8,5 0,10" fill="#000" />
    </svg>
  );
};

export default Arrow;

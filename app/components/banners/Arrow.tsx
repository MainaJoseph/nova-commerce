import React from "react";

const Arrow = () => {
  return (
    <div className="arrow">
      {/* You can use an SVG arrow or any other arrow element here */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17l-3.17-3.17 1.42-1.42L9 13.33l6.59-6.59 1.42 1.42L9 16.17z" />
      </svg>
    </div>
  );
};

export default Arrow;

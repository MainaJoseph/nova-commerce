"use client";

import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <CirclesWithBar color="orange" />
    </div>
  );
};

export default Loader;

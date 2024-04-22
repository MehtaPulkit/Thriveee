import React from "react";
import Subheading from "./Subheading";
import loader from "../assets/gifs/loader.gif";
const LoadingMsg = () => {
  return (
    <div className="flex flex-col gap-6 items-center min-h-300px">
      <img src={loader} alt="loading" />
      <Subheading subheading="Loading...." />
    </div>
  );
};

export default LoadingMsg;

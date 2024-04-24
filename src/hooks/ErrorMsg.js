import React from "react";
import Subheading from "./Subheading";
import CancelBtn from "../elements/CancelBtn";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

const ErrorMsg = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center min-h-300px">
      <XCircleIcon className="w-11 h-11 text-red-600" />
      <Subheading subheading="Sorry.. there was some error! " />
      <CancelBtn text="Go back" handleClick={() => navigate(-1)} />
    </div>
  );
};

export default ErrorMsg;

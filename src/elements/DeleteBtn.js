import React from "react";

const DeleteBtn = ({text,handleClick,disabled}) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-red-300"
    >
      {text||"Delete"}
    </button>
  );
};

export default DeleteBtn;

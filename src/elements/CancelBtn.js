import React from "react";

const CancelBtn = ({ text, handleClick }) => {
  return (
    <button
      className="text-blue-600 mr-4 bg-white hover:bg-gray-100 focus:ring-4 border focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
      type="button"
      onClick={handleClick}
    >
      {text || "Cancel"}
    </button>
  );
};

export default CancelBtn;

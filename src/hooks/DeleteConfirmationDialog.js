import React from "react";
import AlertIcon from "./IconHooks.js/AlertIcon";
import CancelBtn from "../elements/CancelBtn";
import DeleteBtn from "../elements/DeleteBtn";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-300 opacity-90 dark:bg-gray-700"></div>
        <div className="relative m-auto bg-white rounded-lg p-8 top-100 dark:bg-gray-800 dark:text-gray-200">
          <AlertIcon />
          <div className="mb-8">Are you sure you want to delete this item?</div>
          <div className="flex justify-center">
            <CancelBtn handleClick={onClose} />
            <DeleteBtn handleClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;

import React from "react";
import CancelBtn from "../elements/CancelBtn";
import DeleteBtn from "../elements/DeleteBtn";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, msg }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-300 opacity-90 dark:bg-gray-700"></div>
        <div className="relative flex flex-col items-center m-auto bg-white rounded-lg p-8 top-100 dark:bg-gray-800 dark:text-gray-200">
          <ExclamationCircleIcon className="w-14 text-gray-500 dark:text-gray-100 mb-4" />
          <div className="mb-8">
            {msg || "Are you sure you want to delete this item?"}
          </div>
          <div className="flex justify-center">
            <CancelBtn handleClick={onClose} text="No" />
            <DeleteBtn handleClick={onConfirm} text="Yes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;

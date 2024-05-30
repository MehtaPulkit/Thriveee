import React, { useState } from "react";
import {
  useDeleteProfilePictureMutation,
  useUploadProfilePictureMutation,
} from "./userApiSlice";
import { useForm } from "react-hook-form";
import { backendURL } from "../../../../config/connection";
import { useRefreshMutation } from "../../../auth/authApiSlice";
import DeleteBtn from "../../../../elements/DeleteBtn";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import CancelBtn from "../../../../elements/CancelBtn";
import DeleteConfirmationDialog from "../../../../hooks/DeleteConfirmationDialog";

const ProfilePic = ({ firstName, lastName, profilePicture }) => {
  const [image, setImage] = useState(null);
  const [uploadProfilePicture, { data, isLoading, isError }] =
    useUploadProfilePictureMutation();
  const [
    deleteProfilePicture,
    { data: deleteData, isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteProfilePictureMutation();

  const [
    refresh,
    {
      isUninitialized,
      isLoading: refreshIsLoading,
      isSuccess,
      isError: refreshIsError,
      error,
    },
  ] = useRefreshMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    let formData = new FormData();
    formData.append("image", image);
    await uploadProfilePicture(formData);
    await refresh();
    setImage(null);
  };

  const handleDeleteImage = async () => {
    await deleteProfilePicture({ filename: profilePicture });
    await refresh();
    setShowDeletePopup(!showDeletePopup);
  };
  return (
    <>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="items-center md:flex 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
          {!profilePicture ? (
            <div className="mb-4 p-2 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-5xl flex justify-center align-middle items-center">
              {firstName?.split("")[0]} {lastName?.split("")[0]}
            </div>
          ) : (
            <img
              className="mb-4 rounded-lg w-28 h-28 sm:mb-0 border xl:mb-4 2xl:mb-0"
              src={`${backendURL}/users/profilePicture/${profilePicture}`}
              alt="profile picture"
            />
          )}
          <div>
            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              Profile picture
            </h3>
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              JPG or PNG. Max size of 5MB
            </div>
            <div className="flex items-center gap-4">
              {!image ? (
                <>
                  <input
                    id="profile-pic"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-pic"
                    className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Select file
                  </label>
                  <DeleteBtn
                    disabled={!profilePicture}
                    handleClick={() => setShowDeletePopup(!showDeletePopup)}
                  />
                </>
              ) : (
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleImageUpload}
                    >
                      <CloudArrowUpIcon className="w-6 mx-1" />
                      {isLoading ? "..loading" : isError ? "Error" : "Upload"}
                    </button>

                    <CancelBtn handleClick={() => setImage(null)} />
                  </div>
                  <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">{image?.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationDialog
        msg="Are you sure you want to delete your profile picture?"
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDeleteImage}
      />
    </>
  );
};

export default ProfilePic;

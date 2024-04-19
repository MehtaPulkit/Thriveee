import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  emailPattern,
  mobilePattern,
  namePattern,
} from "../../../../config/regexPatterns";
import Input from "../../../../elements/Input";
import { MaxNameLength, MinNameLength } from "../../../../config/minMax";
import {
  useUpdateUserMutation,
  useUploadProfilePictureMutation,
} from "./userApiSlice";
import { Bounce, toast } from "react-toastify";
import UserAddress from "../address/UserAddress";
import ProfilePic from "./ProfilePic";

const UserProfile = () => {
  const {
    id,
    email,
    firstname,
    lastname,
    dateOfBirth,
    mobileNumber,
    currentAddress,
    postalAddress,
    profilePicture,
  } = useAuth();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: firstname,
      lastName: lastname,
      email: email,
      mobileNo: mobileNumber,
      birthday:
        new Date(dateOfBirth).getFullYear() +
        "-" +
        String(new Date(dateOfBirth).getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date(dateOfBirth).getDate()).padStart(2, "0"),
    },
  });

  const handlePersonalSubmit = async ({
    firstName,
    lastName,
    email,
    birthday,
    mobileNo,
  }) => {
    const res = await updateUser({
      id: id,
      firstname: firstName,
      lastname: lastName,
      email: email,
      dateOfBirth: birthday,
      mobileNumber: mobileNo,
    });
    if (res.data) {
      toast.success("Your details are updated!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
    } else if (res.error) {
      toast.error("There was some error!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
    }
    // add Toast here
  };

  return (
    <div>
      <ProfilePic
        firstName={firstname}
        lastName={lastname}
        profilePicture={profilePicture}
      />
      <div className="p-4 mb-4  bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          General information
        </h3>
        <form onSubmit={handleSubmit(handlePersonalSubmit)}>
          <div className="grid grid-cols-6 gap-6">
            <Input
              id="profile-firstName"
              name="firstName"
              label="First Name"
              placeholder="Your first name"
              key="profile-firstName"
              type="text"
              errors={errors}
              pattern={namePattern}
              register={register}
              min={MinNameLength}
              max={MaxNameLength}
              required={true}
            />
            <Input
              id="profile-lastName"
              name="lastName"
              label="Last Name"
              placeholder="Your last name"
              key="profile-lastName"
              type="text"
              errors={errors}
              pattern={namePattern}
              register={register}
              min={MinNameLength}
              max={MaxNameLength}
              required={true}
            />
            <Input
              id="profile-email"
              name="email"
              label="Email"
              placeholder="Your email address"
              key="profile-email"
              type="email"
              errors={errors}
              pattern={emailPattern}
              register={register}
              required={true}
            />
            <Input
              id="profile-mobileNo"
              name="mobileNo"
              label="Mobile Number"
              placeholder="e.g. 04XX XXX XXX"
              key="profile-mobileNo"
              type="text"
              errors={errors}
              pattern={mobilePattern}
              register={register}
              required={true}
            />
            <Input
              id="profile-birthday"
              name="birthday"
              label="Birthday"
              key="profile-birthday"
              type="date"
              errors={errors}
              register={register}
              required={true}
            />

            <div className="col-span-6 sm:col-full">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                type="submit"
              >
                Save all
              </button>
            </div>
          </div>
        </form>
      </div>
      <UserAddress type={"Current"} addressId={currentAddress} />
      <UserAddress type={"Postal"} addressId={postalAddress} />
    </div>
  );
};

export default UserProfile;

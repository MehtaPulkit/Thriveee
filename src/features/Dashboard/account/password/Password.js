import React from "react";
import Input from "../../../../elements/Input";
import { useForm } from "react-hook-form";
import {
  MaxPasswordLength,
  MinPasswordLength,
} from "../../../../config/minMax";
import useAuth from "../../../../hooks/useAuth";
import { useUpdatePasswordMutation } from "../user/userApiSlice";
import { Bounce, toast } from "react-toastify";
import SubmitBtn from "../../../../elements/SubmitBtn";

const Password = () => {
  const { id } = useAuth();
  const [updatePassword, { isLoading, isSuccess, isError, error }] =
    useUpdatePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordChange = async ({
    currentpassword,
    newpassword,
    confirmpassword,
  }) => {
    if (newpassword != confirmpassword) {
      return toast.warn("New and confirm password must match", {
        theme: localStorage.theme,
        transition: Bounce,
      });
    }

    const res = await updatePassword({
      id: id,
      currentPassword: currentpassword,
      password: newpassword,
    });
    if (res.data) {
      toast.success("Your password is updated!", {
        theme: localStorage.theme,
        transition: Bounce,
      });
    } else if (res.error) {
      toast.error(`${res.error.data.message}`, {
        theme: localStorage.theme,
        transition: Bounce,
      });
    }
  };
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">
        Update Password
      </h3>
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <div className="grid grid-cols-6 gap-6">
          <Input
            type="password"
            label="Current Password"
            placeholder="••••••••"
            id="profile-currentpassword"
            name="currentpassword"
            key="profile-currentpassword"
            errors={errors}
            register={register}
            min={MinPasswordLength}
            max={MaxPasswordLength}
            required={true}
          />
          <Input
            type="password"
            label="New Password"
            placeholder="••••••••"
            id="profile-newpassword"
            name="newpassword"
            key="profile-newpassword"
            errors={errors}
            register={register}
            min={MinPasswordLength}
            max={MaxPasswordLength}
            required={true}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            id="profile-confirmpassword"
            name="confirmpassword"
            key="profile-confirmpassword"
            errors={errors}
            register={register}
            min={MinPasswordLength}
            max={MaxPasswordLength}
            required={true}
          />

          <div className="col-span-6 sm:col-full">
          <SubmitBtn text="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Password;

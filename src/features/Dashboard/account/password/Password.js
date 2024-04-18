import React from "react";
import Input from "../../../../elements/Input";
import { useForm } from "react-hook-form";
import { MaxPasswordLength, MinPasswordLength } from "../../../../config/minMax";
import useAuth from "../../../../hooks/useAuth";
import { useUpdateUserMutation } from "../user/userApiSlice";
import { Bounce, toast } from "react-toastify";

const Password = () => {
  const { id, email } = useAuth();
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
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
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.theme,
        transition: Bounce,
      });
    }

    const res = await updateUser({
      id: id,
      email: email,
      currentPassword: currentpassword,
      password: newpassword,
    });
    if (res.data) {
      toast.success("Your password is updated!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.theme,
        transition: Bounce,
      });
    } else if (res.error) {
      toast.error(`${res.error.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
  );
};

export default Password;

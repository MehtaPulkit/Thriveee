import { useForm } from "react-hook-form";
import { MaxPasswordLength, MinPasswordLength } from "../../config/minMax";
import Input from "../../elements/Input";
import { useAddNewUserMutation } from "../dashboard/account/userApiSlice";

import { Bounce, toast } from "react-toastify";

const SignupSecurity = ({ signupData, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [addNewUser, { isLoading, isError, isSuccess }] =
    useAddNewUserMutation();
console.log(signupData);
  const handleSignupSecSubmit = async ({ newpassword, confirmpassword }) => {
    if (newpassword !== confirmpassword) {
      return toast.warn("Password and confirm password must match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    const res = await addNewUser({
      ...signupData,
      password: newpassword,
    });
    if (res.data) {
      setStep({
        shortName: "Confirmation",
        addOnToName: "",
        order: 3,
        stepNo: "3",
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
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignupSecSubmit)}>
      <div className="grid grid-cols-6 gap-6">
        <Input
          type="password"
          label="Create Password"
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
      </div>
      <div className="col-span-6 sm:col-full mt-4">
        <div
          className="text-gray-600 border mr-4 w-28 inline hover:text-blue-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
          type="button"
          onClick={() => {
            setStep({
              shortName: "Personal",
              addOnToName: "Info",
              order: 1,
              stepNo: "1",
            });
          }}
        >
          Back
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
          type="submit"
        >
          Complete
        </button>
      </div>
    </form>
  );
};

export default SignupSecurity;

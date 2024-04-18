import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../elements/Input";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import {
  emailPattern,
  mobilePattern,
  namePattern,
} from "../../config/regexPatterns";
import {
  MaxNameLength,
  MinNameLength,
} from "../../config/minMax";
import Stepper from "../../hooks/Stepper";
import SignupConfirmation from "./SignupConfirmation";
import Checkbox from "../../elements/Checkbox";
import {
  useCheckDuplicateMutation,
} from "../dashboard/account/user/userApiSlice";
import SignupSecurity from "./SignupSecurity";
import { useLocation } from 'react-router-dom';
const Signup = () => {
  
  const [step, setStep] = useState({
    shortName: "Personal",
    addOnToName: "Info",
    order: 1,
    stepNo: "1",
  });
  const [steps, setSteps] = useState([
    { shortName: "Personal", addOnToName: "Info", order: 1, stepNo: "1" },
    { shortName: "Security", addOnToName: "Info", order: 2, stepNo: "2" },
    {
      shortName: "Confirmation",
      addOnToName: "",
      order: 3,
      stepNo: "3",
    },
  ]);
  const [signupData, setSignUpData] = useState();
  const features = [
    "Track your wealth",
    "Manage your investments",
    "Manage your trust",
    "Manage your Super",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [checkDuplicate, { isLoading, isSuccess, isError, error }] =
    useCheckDuplicateMutation();
  const handleSignupSubmit = async (data) => {
    // Check if user exist
    const res = await checkDuplicate({ email: data.email });
    if (res.error) {
      return toast.error(`${res.error?.data?.message}`, {
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
    } else {
      setSignUpData(data);
      setStep({
        shortName: "Security",
        addOnToName: "Info",
        order: 2,
        stepNo: "2",
      });
    }
    //
  };
  const location= useLocation();

  useEffect(() => {
    // Add event listener for beforeunload event
    const handleBeforeUnload = (event) => {
        // Check if form fields are filled
        if (location.pathname.includes("signup")) {
            // Cancel the event
            event.preventDefault();
            // Chrome requires returnValue to be set
            event.returnValue = '';
            // Show alert to the user
            return 'Are you sure you want to leave? Your changes may not be saved.';
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up by removing the event listener when the component unmounts
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);
  return (
    <section>
      <div className="flex flex-col h-screen w-screen md:flex-row">
        <div className="flex justify-center max-h-9 p-6 align-middle signup-bg w-full md:h-screen md:w-2/5 md:flex-col">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                clipRule="evenodd"
              />
            </svg>
            Thriveee
          </Link>

          <div className="hidden md:block p-6 rounded-lg semi-white">
            <h3 className="mb-4 font-semibold text-lg">We got it all covered:</h3>
            <ol>
              {features.map((item, i) => (
                <li className="" key={i}>
                  <span className="text-md">
                    {" "}
                    <svg
                      className="text-green-600 w-6 h-6 inline"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="flex flex-col justify-center align-center items-center  w-full bg-white p-4 dark:bg-gray-900  md:w-3/5 md:p-8 md:p-16">
          <div className="w-full h-full flex flex-col justify-center align-middle">
            <h1 className="mt-4 mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Join us{" "}
              <svg
                className="w-6 h-6 text-black inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </h1>
            <Stepper step={step} steps={steps} />
            <div className="p-2 space-y-4 md:space-y-6 ">
              {step.shortName === "Personal" ? (
                <form onSubmit={handleSubmit(handleSignupSubmit)}>
                  <div className="grid grid-cols-6 gap-6">
                    <>
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
                    </>

                    <div className="col-span-6 sm:col-span-6">
                      <div className="flex mb-4">
                        <Checkbox
                          id="singup-terms"
                          name="terms"
                          errors={errors}
                          register={register}
                          label={
                            <>
                              By signing up, you are creating a Thriveee
                              account, and you agree to Thriveee’s{" "}
                              <a
                                className="text-blue-600 text-primary-600 dark:text-primary-500 font-semibold"
                                href="#"
                              >
                                Terms of Use
                              </a>{" "}
                              and{" "}
                              <a
                                className="text-blue-600 text-primary-600 dark:text-primary-500 font-semibold"
                                href="#"
                              >
                                Privacy Policy
                              </a>
                              .
                            </>
                          }
                          required={true}
                        />
                      </div>
                      <div className="flex ">
                        <Checkbox
                          id="singup-newsletter"
                          name="newsletter"
                          errors={errors}
                          register={register}
                          label="Subscribe to newsletter to know all about our product offers and services."
                          required={false}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-full">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              ) : step.shortName === "Security" ? (
                <SignupSecurity signupData={signupData} setStep={setStep} />
              ) : (
                <SignupConfirmation />
              )}
            </div>
          </div>
          {step.shortName != "Confirmation" && (
            <p className="text-sm font-light text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-blue-500 hover:underline "
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;

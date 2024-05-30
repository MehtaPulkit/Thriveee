import React, { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { backendURL } from "../../../config/connection";
import { useRefreshMutation } from "../../auth/authApiSlice";
const AccountSummary = () => {
  const {
    firstname,
    lastname,
    email,
    mobileNumber,
    dateOfBirth,
    postalAddress,
    profilePicture,
    currentAddress,
    notificationPreference,
  } = useAuth();

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
  
  useEffect(() => {
    refresh();
  }, []);
  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl sm:leading-none sm:tracking-tight dark:text-white">
        Welcome, {firstname}{" "}
      </h1>
      <p className="mb-6 text-base font-normal text-gray-500 sm:text-lg dark:text-gray-400">
        Your home for managing your account, billing and subscription settings.
      </p>
      <div className="flex flex-col justify-between sm:flex-row align-center w-full gap-2 ">
        <div className="flex gap-4 p-6 mb-4 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <div className="w-full">
            <Link to="profile" relative="path">
              <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-600">
                Personal Details
              </h2>
            </Link>
            <div className="text-gray-500 dark:text-gray-400">
              {firstname} {lastname}
            </div>{" "}
            <div className="text-gray-500 dark:text-gray-400">{email}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {new Date(dateOfBirth).getDate() +
                "-" +
                (new Date(dateOfBirth).getMonth() + 1) +
                "-" +
                new Date(dateOfBirth).getFullYear()}
            </div>{" "}
            <div className="text-gray-500 dark:text-gray-400">
              {mobileNumber}
            </div>
          </div>
          {profilePicture && (
            <img
              className="mt-10 rounded-lg h-16 sm:w-28 md:h-28  xl:mb-4 2xl:mb-0"
              src={`${backendURL}/users/profilePicture/${profilePicture}`}
              alt="Jese picture"
            ></img>
          )}
        </div>
        <div className="flex gap-4 p-6 mb-4 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <div>
            <Link to="profile" relative="path">
              <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-600">
                Address Details
              </h2>
            </Link>
            <div className="text-gray-500 dark:text-gray-400">
              <b>Current</b>:{" "}
              <span>
                {currentAddress ? (
                  <>
                    {currentAddress.addressLine1 +
                      " " +
                      currentAddress.addressLine2 +
                      " " +
                      currentAddress.suburb +
                      " " +
                      currentAddress.state +
                      " " +
                      currentAddress.postalCode}
                  </>
                ) : (
                  <>Not provided</>
                )}
              </span>
            </div>{" "}
            <div className="text-gray-500 dark:text-gray-400">
              <b>Postal</b>:{" "}
              <span>
                {" "}
                {postalAddress ? (
                  <>
                    {postalAddress.addressLine1 +
                      " " +
                      postalAddress.addressLine2 +
                      " " +
                      postalAddress.suburb +
                      " " +
                      postalAddress.state +
                      " " +
                      postalAddress.postalCode}
                  </>
                ) : (
                  <>Not provided</>
                )}
              </span>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between sm:flex-row align-center w-full gap-2 ">
        <div className="p-6 mb-4 bg-white border w-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer ">
          <Link to="subscription" relative="path">
            <h2 className="mb-2 text-xl font-semibold tracking-tight  text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-600 ">
              Subscription
            </h2>
          </Link>
          <div className="text-gray-500 dark:text-gray-400">
            <b>Free</b>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            <b>Expirying</b>: 31/01/2026
          </div>
        </div>
        <div className="p-6 mb-4 bg-white border w-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <Link to="payment" relative="path">
            <h2 className="mb-2 text-xl font-semibold tracking-tight  text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-600">
              Payment and Bills
            </h2>
          </Link>
          <div className="text-gray-500 dark:text-gray-400">
            View your last bill
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Update payment details
          </div>
        </div>
        <div className="p-6 mb-4 bg-white border w-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <Link to="notification" relative="path">
            <h2 className="mb-2 text-xl font-semibold tracking-tight  text-gray-900 dark:text-white hover:text-blue-600  dark:hover:text-blue-600">
              Notification
            </h2>
          </Link>
          <div className="text-gray-500 dark:text-gray-400">
            <b> Via</b>:{" "}
            {notificationPreference?.typeNotification === "Email"
              ? "Email"
              : notificationPreference?.typeNotification === "Mobile"
              ? "Mobile"
              : notificationPreference?.typeNotification === "Both"
              ? "Email & Mobile"
              : "Not selected"}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            <b>Newsletter</b>:{" "}
            {notificationPreference?.newsletterNotification ? "On" : "Off"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;

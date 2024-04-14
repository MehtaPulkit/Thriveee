import React, { useEffect, useState } from "react";
import { useUpdateUserNotificationsMutation } from "./userApiSlice";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Bounce, toast } from "react-toastify";
import { useGetNotificationPreferenceQuery } from "./notification/userNotificationApiSlice.js";
const notificationData = [
  {
    id: "Type",
    name: "Notification via:",
    info: "Your preference matters! choose what suits you:",
  },
  {
    id: "NewsLetter",
    name: "Subscribe to newsletter",
    info: "Get all the buzz about the products and offers.",
  },
];
const Notification = () => {
  const { id, notificationPreference } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const options = ["Email", "Mobile", "Both"];

  const [updateUserNotifications, { isLoading, isSuccess, isError, error }] =
    useUpdateUserNotificationsMutation();

  const {
    data: notificationPrefData,
    isFetching,
    isLoading: notiPrefIsLoading,
  } = useGetNotificationPreferenceQuery(notificationPreference, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const handleNotificationPreference = async ({
    typeNotification,
    newsletterNotification,
  }) => {
    const res = await updateUserNotifications({
      id,
      typeNotification,
      newsletterNotification,
    });
    if (res.data) {
      toast.success("Your notification preferences are updated!", {
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

  useEffect(() => {
    if (notificationPrefData) {
      reset({
        typeNotification: notificationPrefData.typeNotification,
        newsletterNotification: notificationPrefData.newsletterNotification,
      });
    }
  }, [notificationPrefData]);
  return (
    <div className="grid grid-cols-1 px-4 xl:grid-cols-2 xl:gap-4">
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
        <div className="flow-root">
          <h3 className="text-xl font-semibold dark:text-white">
            Alerts & Notifications
          </h3>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Personalise your alerts and notifications
          </p>
          <form onSubmit={handleSubmit(handleNotificationPreference)}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notificationData.map((noti, i) => (
                <div className="flex items-center justify-between py-4" key={i}>
                  <div className="flex flex-col flex-grow">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {noti.name}
                    </div>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {noti.info}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {noti.id == "Type" ? (
                      <>
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          {options.map((m, i) => (
                            <li
                              key={m}
                              className={`w-full${
                                i != options.length - 1 &&
                                " border-gray-200 border-b sm:border-b-0 sm:border-r"
                              } dark:border-gray-600`}
                            >
                              <div className="flex items-center ps-3 ">
                                <input
                                  {...register("typeNotification", {
                                    required: {
                                      value: true,
                                      message: `Notification preference is required`,
                                    },
                                  })}
                                  id="type-notification"
                                  type="radio"
                                  value={m}
                                  className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  htmlFor="horizontal-notification"
                                  className="w-full py-3 px-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {m}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {errors["typeNotification"]?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors["typeNotification"]?.message}
                          </p>
                        )}
                      </>
                    ) : (
                      <label
                        htmlFor={noti.id}
                        className="relative flex items-center cursor-pointer"
                      >
                        <input
                          {...register("newsletterNotification")}
                          type="checkbox"
                          id={noti.id}
                          className="sr-only"
                          // checked={noti}
                        />
                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                type="submit"
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Notification;

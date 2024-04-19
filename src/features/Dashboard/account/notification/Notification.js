import React, { useEffect, useState } from "react";
import { useUpdateUserNotificationsMutation } from "../user/userApiSlice.js";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth.js";
import { Bounce, toast } from "react-toastify";
import { useGetNotificationPreferenceQuery } from "./userNotificationApiSlice.js";
import Toggle from "../../../../elements/Toggle.js";
import RadioGrp from "../../../../elements/RadioGrp.js";
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
                <div
                  className="flex flex-col gap-4 py-4 md:flex-row md:justify-between"
                  key={i}
                >
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
                        <RadioGrp
                          id="type-notification"
                          register={register}
                          errors={errors}
                          name="typeNotification"
                          required={true}
                          requiredMessage="Notification preference is required"
                          options={options}
                        />
                      </>
                    ) : (
                      <Toggle
                        id={noti.id}
                        register={register}
                        required={false}
                        errors={errors}
                        name="newsletterNotification"
                      />
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

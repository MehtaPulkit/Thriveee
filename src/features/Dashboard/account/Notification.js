import React, { useState } from "react";
const notificationData = [
  {
    id: "OP",
    name: "Offers & Products",
    info: "Get latest update about all the offers and products",
    sms: true,
    email: true,
  },
  {
    id: "SS",
    name: "Smart suggestions",
    info: "Suggestions to make your changes or update your account details",
    sms: true,
    email: true,
  },
  {
    id: "IR",
    name: "Investments Related",
    info: "Get updates on any activity which is your investments related",
    sms: true,
    email: false,
  },
  {
    id: "TR",
    name: "Trust Related",
    info: "All trust related activity will be notified",
    sms: false,
    email: true,
  },
  {
    id: "SR",
    name: "SMSF Related",
    info: "All SMSF related activity will be notified",
    sms: true,
    email: false,
  },
];
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
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
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notificationData.map((noti, i) => (
              <div className="flex items-center justify-between py-4" key={i}>
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {noti.name}
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {noti.info}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    SMS
                    <label
                      htmlFor={`sms-${noti.id}"`}
                      className="relative flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={`sms-${noti.id}"`}
                        className="sr-only"
                        checked={noti.sms}
                      />
                      <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                    </label>
                  </div>
                  <div>
                    Email
                    <label
                      htmlFor={`email-${noti.id}`}
                      className="relative flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={`email-${noti.id}`}
                        className="sr-only"
                        checked={noti.email}
                      />
                      <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">
              Save all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

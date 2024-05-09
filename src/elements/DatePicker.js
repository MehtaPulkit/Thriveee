import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Datepicker from "tailwind-datepicker-react";
const options = {
  // title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white dark:bg-gray-700",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "w-full",
    inputIcon: "hidden",
    selected: "hover:text-blue-900",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <ArrowLeftIcon className="text-gray-800 w-6 dark:text-white" />,
    next: () => (
      <ArrowRightIcon className="text-gray-800 w-6 dark:text-white" />
    ),
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
};
const DatePicker = ({ id, name, label, register, errors, required }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };
  const errorMessage = errors[name]?.message;
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none mr-4">
            <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>

          <input
            {...register(name, {
              required: { value: required, message: `${label} is required` },
            })}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="Select Date"
            value={new Intl.DateTimeFormat("en-AU", {
              timeZone: "Australia/Sydney",
            }).format(selectedDate)}
            onFocus={() => setShow(true)}
          />
        </div>
      </Datepicker>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DatePicker;

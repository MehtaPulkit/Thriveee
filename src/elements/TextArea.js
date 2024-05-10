import React from "react";

const TextArea = ({
  id,
  name,
  className,
  required,
  label,
  register,
  errors,
}) => {
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
      <textarea
        {...register(name, {
          required: { value: required, message: `${label} is required` },
        })}
        id={id}
        rows="4"
        className={`shadow-sm border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 ${
          errors[name]
            ? "bg-red-50 border-red-400 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:placeholder-red-400   dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            : "bg-gray-50 border-gray-300 focus-visible:border-blue-500 focus:border-blue-500   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }   `}
        placeholder=""
      ></textarea>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextArea;

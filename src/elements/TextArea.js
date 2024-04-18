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
      </label>
      <textarea
        {...register(name, {
          required: { value: required, message: `${label} is required` },
        })}
        id={id}
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

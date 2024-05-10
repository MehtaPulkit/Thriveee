import React from "react";

const FormCheckbox = ({ id, name, register, errors, label, required }) => {
  const errorMessage = errors[name]?.message;
  return (
    <div className="col-span-6 items-center">
      <input
        {...register(name, {
          required: { value: required, message: `${label} is required` },
        })}
        id={id}
        type="checkbox"
        className={`w-4 h-4 rounded ${
          errors[name]
            ? "bg-red-50 border-red-400 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:placeholder-red-400   dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            : "text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        }`}
      />
      <label
        htmlFor={id}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormCheckbox;

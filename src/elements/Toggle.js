import React from "react";

const Toggle = ({ id, register, required, errors, name, label, className }) => {
  const errorMessage = errors[name]?.message;

  return (
    <>
      <label htmlFor={id} className={`relative flex items-center cursor-pointer ${className}`}>
        {label}
        <input
          {...register(name, {
            required: { value: required, message: `This is required` },
          })}
          type="checkbox"
          id={id}
          className="sr-only"
        />
        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
      </label>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default Toggle;

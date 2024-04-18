import React from "react";

const RadioGrp = ({
  id,
  name,
  className,
  required,
  label,
  register,
  errors,
  options,
  requiredMessage,
  needHeading,
  heading
}) => {
  const errorMessage = errors[name]?.message;
  return (
    <div className="col-span-6 sm:col-span-6">
      {needHeading && (
        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {heading}{required && <span className="text-red-500">*</span>}
        </h3>
      )}
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {options.map((option, i) => (
          <li
            key={option}
            className={`w-full ${
              i != options.length - 1 &&
              " border-gray-200 border-b sm:border-b-0 sm:border-r"
            } dark:border-gray-600`}
          >
            <div className="flex items-center ps-3 ">
              <input
                {...register(name, {
                  required: {
                    value: required,
                    message: requiredMessage,
                  },
                })}
                id={id}
                type="radio"
                value={option}
                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor={id}
                className="w-full py-3 px-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {option}
              </label>
            </div>
          </li>
        ))}
      </ul>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default RadioGrp;

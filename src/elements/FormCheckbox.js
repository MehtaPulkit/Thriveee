import React from "react";

const FormCheckbox = ({ id, name, register, errors, label, required }) => {
  return (
    <div className="col-span-6 flex items-center">
      <input
        {...register(name, {
          required: { value: required, message: `This is a required field` },
        })}
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
      htmlFor="checked-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}{required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

export default FormCheckbox;

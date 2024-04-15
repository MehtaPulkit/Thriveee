import React from "react";

const Checkbox = ({
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
    <>
      <div className="flex justify-center align-middle">
        <input
        {...register(name,{
            required: { value: required, message: `This is a required field` },
        })}
          id={id}
          aria-label={name}
          aria-describedby={name}
          type="checkbox"
          className={className}
        />
      </div>
      <div className="ml-2 text-xs text-gray-600">
        <label htmlFor={id}>
         {label}
        </label>
        {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
      </div>
    </>
  );
};

export default Checkbox;

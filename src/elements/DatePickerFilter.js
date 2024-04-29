import { Datepicker } from "flowbite-react";
import React, { useState } from "react";

const DatePickerFilter = ({ label, id, defaultValue }) => {
  const [value, setValue] = useState();

  const dobHandler = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="mb-2 max-w-96">
      <label
        htmlFor={id}
        className="block font-semibold text-sm text-gray-700 dark:text-gray-400"
      >
        {label}
      </label>

      <Datepicker
        defaultDate={defaultValue}
        onSelect={dobHandler}
        weekStart={1}
      />
    </div>
  );
};

export default DatePickerFilter;

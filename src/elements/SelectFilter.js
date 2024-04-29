import React from "react";

const SelectFilter = ({ options, id, label, selectedOption, setSelectedOption }) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={id}
        className="block font-semibold text-sm text-gray-700 dark:text-gray-400 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          if (e.target.value) {
            setSelectedOption(
              options.filter((o) => o.value == e.target.value)[0]
            );
          }
        }}
        defaultValue={selectedOption.value}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="p-2">
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;

import React from "react";

const Subheading = ({ subheading }) => {
  return (
    <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-600">
      {subheading}
    </h2>
  );
};

export default Subheading;

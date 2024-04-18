import React from "react";

const Heading = ({ heading }) => {
  return (
    <h1 className="text-xl my-6 font-semibold text-gray-900 sm:text-2xl dark:text-white">
      {heading}
    </h1>
  );
};

export default Heading;

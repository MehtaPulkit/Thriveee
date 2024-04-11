import React from "react";
import { Link } from "react-router-dom";

const LinkCard = ({heading, subHeading, linkTitle,link}) => {
  return (
    <div className="col-span-2 sm:col-span-1 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
       {heading}
      </h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {subHeading}
      </p>
      <Link
        to={link}
        className="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        {linkTitle}
        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
      </svg>


      </Link>
    </div>
  );
};

export default LinkCard;

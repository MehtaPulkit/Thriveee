import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";

const Breadcrumbs = ({ breadcrumbList }) => {
  return (
    <div className="mb-4 w-full xl:mb-2">
      <nav className="flex mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
          {breadcrumbList.map((bc) => (
            <li key={bc?.id} className="inline-flex items-center">
              {bc?.index === 1 ? (
                <Link
                  to={bc?.link}
                  className="inline-flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
                >
                  <HomeIcon width={18} />
                  {bc?.bcName}
                </Link>
              ) : (
                <div className="flex items-center">
                  <ChevronRightIcon width={18} />
                  <Link
                    to={bc?.link}
                    className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                  >
                    {bc?.bcName}
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;

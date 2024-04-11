import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="dark:bg-gray-900 flex bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center banner-section lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none drop-shadow-[2px 2px 4px rgba(0, 0, 0, 0.5)] text-white text-left md:text-5xl lg:text-6xl dark:text-white">
          Become master of your investments with{" "}
          <span className="linear-wipe">Thriveee</span>
        </h1>
        <p className="mb-8 text-lg text-left font-normal text-gray-500 lg:text-xl max-w-lg dark:text-gray-400">
          Unlock your investment potential with our all-in-one management portal
          - where every decision leads to financial empowerment.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-y-0">
          <Link
            to="/auth/login"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <Link
            to="/services"
            className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;

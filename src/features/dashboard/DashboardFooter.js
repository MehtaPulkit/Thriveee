import React from "react";
import { Link } from "react-router-dom";
import Facebook from "../../hooks/IconHooks/Facebook";
import Insta from "../../hooks/IconHooks/Insta";
import Twitter from "../../hooks/IconHooks/Twitter";

const DashboardFooter = () => {
  const footerLinks = [
    { title: "Terms & Conditions", url: "/terms-conditions" },
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Licensing", url: "/licensing" },
    { title: "Cookie Policy", url: "/cookies" },
    { title: "Contact", url: "/contact" },
  ];
  return (
    <footer className="lg:ml-64 py-6 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="p-4 my-100 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 xl:p-8">
        <ul className="flex flex-wrap items-center mb-6 space-y-1 md:mb-0">
          {footerLinks.map((footer, i) => (
            <li key={i}>
              <Link
                to={footer.url}
                className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
              >
                {footer.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-6 sm:justify-center">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Facebook/>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
           <Insta/>
          </a>
          <a href="#">
            <Twitter/>
          </a>
        </div>
      </div>
      <p className="my-10 text-sm text-center text-gray-500">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://flowbite.com/"
          className="hover:underline"
          target="_blank"
        >
          Thriveee.com
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default DashboardFooter;

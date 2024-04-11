import React from "react";
import { Link } from "react-router-dom";

const Tabs = ({ tablist, activeTabIndex, setActiveTabIndex }) => {
  const activeClass =
    "text-blue-600  border-blue-600 active  border-b-2 dark:text-blue-500 dark:border-blue-500";
  const normalClass =
    "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  const disabledClass =
    "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500";
  return (
    <div className="text-sm font-medium text-center text-gray-500  border-gray-200 mb-6 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {tablist?.map((tab, i) => (
          <li
            className="me-2"
            key={tab?.id}
            onClick={() => {
              if (!tab?.isDisabled) setActiveTabIndex(tab?.index);
            }}
          >
            {tab?.isDisabled ? (
              <span className={disabledClass}>{tab?.tabName}</span>
            ) : (
              <Link
                to={tab?.link}
                className={
                  tab?.isDisabled
                    ? disabledClass
                    : `inline-block p-4 rounded-t-lg ${
                        tab?.index === activeTabIndex
                          ? activeClass
                          : normalClass
                      } `
                }
                aria-current="page"
              >
                {tab?.tabName}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;

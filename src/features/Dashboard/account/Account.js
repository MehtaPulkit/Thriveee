import React, { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Tabs from "../../../hooks/Tabs";
import Breadcrumbs from "../../../hooks/Breadcrumbs";
import { tablist } from "../../../config/AccountData";

const Account = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tab = useLocation().pathname.split("/");
  const breadcrumbList = [
    {
      id: "bc1",
      type: "home",
      index: 1,
      bcName: "Dashboard",
      link: "/dashboard",
      isDisabled: false,
    },
    {
      id: "bc2",
      type: "branch",
      index: 2,
      bcName: "Account",
      link: "/dashboard/account",
      isDisabled: false,
    },
  ];

  useEffect(() => {
    const currentTab = tablist.find(
      (t) => t.tabName.toLowerCase() == tab[tab.length - 1]
    );
    setActiveTabIndex(currentTab?.index || 0);
  }, [tab]);
  return (
    <main className="lg:ml-64 ">
      <div className="p-4 w-full h-full bg-gray-50 dark:bg-gray-900">
        <Breadcrumbs breadcrumbList={breadcrumbList} />
        <Tabs
          tablist={tablist}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <Outlet />
      </div>
    </main>
  );
};

export default Account;

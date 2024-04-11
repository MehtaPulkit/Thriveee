import React from "react";
import Welcome from "./Welcome";

const DashboardHome = () => {
  return (
    <div
      id="main-content"
      className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
    >
      <main>
        <div className="px-4 pt-6">
          <Welcome />
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;

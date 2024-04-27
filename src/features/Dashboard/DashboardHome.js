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
          <ul>
            <li>#Account balances</li>
            <li>#Investment performance</li>
            <li>#Upcoming deadline</li>
            <li>#
              Doc Mgmt: financial statements, tax returns, and compliance
              documents.
            </li>
            <li>#
              Tax Planning Tools: Include tools and calculators to help users
              plan for tax obligations, such as contribution caps, tax
              deductions, and capital gains tax.
            </li>
            <li>#Resources</li>
            <li>#News and update:</li>
            <li>#Messaging</li>
            <li>#importing financial data and generating reports for tax purposes.</li>
            <li>#Customer support</li>
            <li>#FAQ</li>
            <li>#mplement robust security measures, such as SSL encryption, firewalls, and regular security audits, to protect users' sensitive financial information.</li>
            <li>#Feedback and Surveys:</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;

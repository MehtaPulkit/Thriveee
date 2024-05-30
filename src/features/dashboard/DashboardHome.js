import React from "react";
import Welcome from "./Welcome";
import SimpleBarGraph from "./SimpleBarGraph";
import SimpleLineGraph from "./SimpleLineGraph";
import info from "../../assets/infographic.jpeg";
const FinancialData = [
  {
    name: "Jan",
    uv: 4000,
    Income: 2400,
    Expense: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    Income: 1398,
    Expense: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    Income: 4800,
    Expense: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    Income: 3908,
    Expense: 2000,
  },
  {
    name: "May",
    uv: 2780,
    Income: 1908,
    Expense: 2000,
  },
  {
    name: "Jun",
    uv: 1890,
    Income: 0,
    Expense: 0,
  },
];

const DashboardHome = () => {
  return (
    <div
      id="main-content"
      className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
    >
      <main>
        <div className="px-4 pt-6">
          <div className="flex justify-between my-6 flex-col md:flex-row">
            <Welcome />
            <img alt="infographic" src={info} className="w-64 rounded-lg" />
          </div>

          <div className="flex justify-between flex-col md:flex-row">
          <div>
              <SimpleLineGraph data={FinancialData} />
            </div>
            <div className="flex flex-col gap-12">
              <SimpleBarGraph
                data={FinancialData}
                keyData="Income"
                fill="#1a56dbb0"
                hoverFill="#316aeb"
              />
              <SimpleBarGraph
                data={FinancialData}
                keyData="Expense"
                fill="#8d2d2db0"
                hoverFill="#c73335"
              />
            </div>
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;

import React from "react";
import Welcome from "./Welcome";
import SimpleBarGraph from "./SimpleBarGraph";

const IncomeData = [
  {
    name: "Jan",
    uv: 4000,
    Income: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    Income: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    Income: 4800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    Income: 3908,
    amt: 2000,
  },
  {
    name: "Jun",
    uv: 1890,
    Income: 4800,
    amt: 2181,
  },
  {
    name: "Jul",
    uv: 2390,
    Income: 3800,
    amt: 2500,
  },
  {
    name: "Aug",
    uv: 3490,
    Income: 4300,
    amt: 2100,
  },
];
const ExpenseData = [
  {
    name: "Jan",
    uv: 4000,
    Expense: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    Expense: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    Expense: 400,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    Expense: 1200,
    amt: 2000,
  },
  {
    name: "Jun",
    uv: 1890,
    Expense: 3000,
    amt: 2181,
  },
  {
    name: "Jul",
    uv: 2390,
    Expense: 300,
    amt: 2500,
  },
  {
    name: "Aug",
    uv: 3490,
    Expense: 2800,
    amt: 2100,
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
          <Welcome />
          <div>
          <div className="flex flex-col">
            <SimpleBarGraph
              data={IncomeData}
              keyData="Income"
              fill="#1a56dbb0"
              hoverFill="#316aeb"
            />
            <SimpleBarGraph
              data={ExpenseData}
              keyData="Expense"
              fill="#8d2d2db0"
              hoverFill="#c73335"
            />
          </div>
          <div >

          </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;

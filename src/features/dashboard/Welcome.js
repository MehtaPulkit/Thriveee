import React from "react";
import manageImg from "../../assets/Manage-img.svg";

const Welcome = () => {
  const currentTime = new Date();
  currentTime.getHours();
  const currentHour = currentTime.getHours();
  return (
    <div className="mt-2 mb-6">
      <h1 className="font-semibold text-2xl tracking-wide dark:text-white">
        {currentHour < 12
          ? "Good morning!"
          : currentHour > 12 && currentHour < 17
          ? "Good afternoon!"
          : "Good evening!"}
      </h1>
      <h2 className="text-gray-500 dark:text-gray-400">
        Success is just a click away.
      </h2>
      {/* <img src={manageImg}alt="" className="lg:w-96"/>
      <a href="https://www.freepik.com/free-vector/people-analyzing-growth-charts_12643932.htm#fromView=search&page=1&position=1&uuid=dfaaf3a5-2af1-4d4e-8228-5ebd2eb978ee">
        Image by freepik
      </a> */}
      <h2 className="text-gray-500 dark:text-gray-400 mt-4">
        Take control of your financial future with our intuitive and
        user-friendly platform. Track your spending, set budgets, and achieve
        your financial goals effortlessly.{" "}
      </h2>
    </div>
  );
};

export default Welcome;

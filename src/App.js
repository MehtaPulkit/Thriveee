import React from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Layout from "./components/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Prefetch from "./features/auth/Prefetch";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import DashboardHome from "./features/dashboard/DashboardHome";
import Account from "./features/dashboard/account/Account";
import UserProfile from "./features/dashboard/account/UserProfile";
import AccountSummary from "./features/dashboard/account/AccountSummary";
import Password from "./features/dashboard/account/Password";
import Notification from "./features/dashboard/account/notification/Notification";

import { ROLES } from "./config/roles";

function App() {
  return (
    <>
      <div className="bg-white font-serif dark:bg-black ">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="account" element={<Account />}>
                    <Route index element={<AccountSummary />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="password" element={<Password />} />
                    <Route path="notification" element={<Notification />} />
                  </Route>
                  <Route path="financials" element={<Account />}>
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="password" element={<Password />} />
                    <Route path="notification" element={<Notification />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

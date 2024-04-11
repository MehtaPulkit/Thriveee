import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./features/auth/Login";
import AuthLayout from "./features/auth/AuthLayout";
import Signup from "./features/auth/Signup";
import DashboardLayout from "./features/Dashboard/DashboardLayout";
import DashboardHome from "./features/Dashboard/DashboardHome";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import UserProfile from "./features/Dashboard/account/UserProfile";
import Account from "./features/Dashboard/account/Account";
import Password from "./features/Dashboard/account/Password";
import Notification from "./features/Dashboard/account/Notification";
import Prefetch from "./features/auth/Prefetch";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AccountSummary from "./features/Dashboard/account/AccountSummary";
function App() {
  return (
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

        <Route exact path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route exact path="/dashboard" element={<DashboardLayout />}>
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
  );
}

export default App;

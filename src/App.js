import React from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Prefetch from "./features/auth/Prefetch";
import DashboardHome from "./features/dashboard/DashboardHome";
import Account from "./features/dashboard/account/Account";
import UserProfile from "./features/dashboard/account/user/UserProfile";
import AccountSummary from "./features/dashboard/account/AccountSummary";
import Password from "./features/dashboard/account/password/Password";
import Notification from "./features/dashboard/account/notification/Notification";

import { ROLES } from "./config/roles";
import ContactsList from "./features/dashboard/contacts/ContactsList";
import Contact from "./features/dashboard/contacts/Contact";
import ContactsLayout from "./features/dashboard/contacts/ContactsLayout";
import QuotesLayout from "./features/dashboard/quotes/QuotesLayout";
import Quote from "./features/dashboard/quotes/Quote";
import QuotesList from "./features/dashboard/quotes/QuotesList";
import TaxCodeLayout from "./features/dashboard/accounting/taxCodes/TaxCodeLayout";
import TaxCodeList from "./features/dashboard/accounting/taxCodes/TaxCodeList";
import TaxCode from "./features/dashboard/accounting/taxCodes/TaxCode";
import AccountingLayout from "./features/dashboard/accounting/AccountingLayout";
import TxAccountLayout from "./features/dashboard/accounting/taxAccounts/TxAccountLayout";
import TxAccount from "./features/dashboard/accounting/taxAccounts/TxAccount";
import TxAccountsList from "./features/dashboard/accounting/taxAccounts/TxAccountsList";
import JobLayout from "./features/dashboard/accounting/jobs/JobLayout";
import JobsList from "./features/dashboard/accounting/jobs/JobsList";
import Job from "./features/dashboard/accounting/jobs/Job";
import MainLayout from "./features/dashboard/MainLayout";

function App() {
  return (
    <>
      <div className="bg-white font-serif dark:bg-black ">
        <ToastContainer
          position="top-center"
          autoClose={3000}
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
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="/dashboard" element={<MainLayout />}>
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
                  <Route path="contacts" element={<ContactsLayout />}>
                    <Route index element={<ContactsList />} />
                    <Route path="create" element={<Contact />} />
                    <Route path="edit/:cID" element={<Contact />} />
                  </Route>
                  <Route path="quotes" element={<QuotesLayout />}>
                    <Route index element={<QuotesList />} />
                    <Route path="create" element={<Quote />} />
                    <Route path="edit/:qID" element={<Quote />} />
                  </Route>
                  <Route path="accounting" element={<AccountingLayout />}>
                    <Route path="tax-codes" element={<TaxCodeLayout />}>
                      <Route index element={<TaxCodeList />} />
                      <Route path="create" element={<TaxCode />} />
                      <Route path="edit/:tcID" element={<TaxCode />} />
                    </Route>

                    <Route
                      path="chart-of-accounts"
                      element={<TxAccountLayout />}
                    >
                      <Route index element={<TxAccountsList />} />
                      <Route path="create" element={<TxAccount />} />
                      <Route path="edit/:coaID" element={<TxAccount />} />
                    </Route>
                    <Route path="jobs" element={<JobLayout />}>
                      <Route index element={<JobsList />} />
                      <Route path="create" element={<Job />} />
                      <Route path="edit/:jobID" element={<Job />} />
                    </Route>
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

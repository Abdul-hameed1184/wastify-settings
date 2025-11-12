import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import ScrolltoTop from "./Component/ScrolltoTop";
// import SignUp from "./Pages/Auth/SignUp";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import CreateAccount from "./Pages/Auth/CreateAccount";
import PropertyUnit from "./Pages/Auth/PropertyUnit";
import PropertyAccount from "./Pages/Auth/PropertyAccount";
import PropertyPreview from "./Pages/Auth/PropertyPreview";
import SignUpComplete from "./Pages/Auth/SignUpComplete";
import Login from "./Pages/Auth/Login";
import BillList from "./Pages/QuickPay/BillList";
import PayAmount from "./Pages/QuickPay/PayAmount";
import Confirmation from "./Pages/QuickPay/Confirmation";
import ModeOfPayment from "./Pages/QuickPay/ModeOfPayment";
import CardPayment from "./Pages/QuickPay/CardPayment";
import PaymentSuccessful from "./Pages/QuickPay/PaymentSuccessful";
import Profile from "./Pages/UserProfile/Profile";
import Wastebills from "./Pages/UserProfile/Wastebills";
import PaymentHistory from "./Pages/UserProfile/PaymentHistory";
import ViewProperty from "./Pages/UserProfile/ViewProperty";
import Supportx from "./Pages/UserProfile/Support";
import Overview from "./Pages/Operator/Overview";
import AdminLayout from "./Layouts/AdminLayout";
import Dash from "./Pages/Operator/Dashboard/Dash";
import RevenueIndex from "./Pages/Operator/Revenue/RevenueIndex";
import Records from "./Pages/Operator/Customers/Records";
import Transaction from "./Pages/Operator/Billing/Transaction";
import Reports from "./Pages/Operator/Customers/Reports";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import axios from "axios";
import LoginProtect from "./utils/LoginProtect";
import AdminLoginProtect from "./utils/AdminLoginProtect";
import SuperAdminLoginProtect from "./utils/SuperAdminLoginProtect";
import All from "./Pages/Operator/Settings/All";
import Pricing from "./Pages/Operator/Settings/Pricing";
import ResetPassword from "./Pages/Auth/ResetPassword";
import SendRestLink from "./Pages/Auth/SendRestLink";
import ResetPasswordVerify from "./Pages/Auth/ResetPasswordVerify";
import AllCustomers from "./Pages/Operator/Billing/AllCustomers";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAccess from "./Pages/Operator/Settings/UserAccess";
import Security from "./Pages/Operator/Settings/Security";
import CompanyProfile from "./Pages/Operator/Settings/CompanyProfile";
import NotificationSettings from "./Pages/Operator/Settings/NotificationSettings";
import AppSettings from "./Pages/Operator/Settings/AppSettings";
import Property from "./Pages/Operator/Customers/Property";
import Properties from "./Pages/Operator/Customers/Properties";
import PropertiesLayout from "./Layouts/PropertiesLayout";
import ApartmentBill from "./Pages/Operator/Customers/ApartmentBill";
import UserLayout from "./Layouts/UserLayout";
import ContactUs from "./Pages/UserProfile/Contact";
import Customers from "./Pages/Operator/Customers/Customers";
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import Dashboard from "./Pages/UserProfile/Dashboard";
import OperatorLayout from "./Layouts/OperatorLayout";
import OperatorForgotPassword from "./Pages/Operator/Auth/OperatorForgotPassword";
import OperatorLogin from "./Pages/Operator/Auth/OperatorLogin";
import OperatorReg from "./Pages/Operator/Auth/OperatorReg";
import OperatorResetPassword from "./Pages/Operator/Auth/OperatorResetPassword";
import { QuickpayProperties } from "./Pages/QuickPay/QuickpayProperties";
import SupportLogin from "./Pages/Support/Auth/SupportLogin";
import { Tickets } from "./Pages/Support/Tickets/Ticket";
import { SupportDashboard } from "./Pages/Support/Dashboard/SupportDashboard";
import SupportLayout from "./Layouts/SupportLayout";

const App: React.FC = () => {
  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("SESSION_AUTH_TOKEN");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });


  return (
    <>
      {/* UseNavigate in reaxct pass static parameters needed for the next route through it  */}
      <ScrolltoTop />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <Routes>
        {/* Auth routes start */}
        <Route path="/" element={<Home />} />
        <Route element={<LoginProtect />}>
          {/* <Route path="signup" element={<SignUp />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forget-password" element={<SendRestLink />} />
          <Route
            path="forget-password-verify"
            element={<ResetPasswordVerify />}
          />
          <Route path="verifyotp" element={<VerifyOtp />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="propertyunit" element={<PropertyUnit />} />
          <Route path="propertyaccount" element={<PropertyAccount />} />
          <Route path="propertyreview" element={<PropertyPreview />} />
          <Route path="completed" element={<SignUpComplete />} />
        </Route>
        {/* Auth routes end  */}

        {/* Quick Pay routes start */}
        <Route path="quickpay/properties" element={<QuickpayProperties />} />
        <Route path="currentbills" element={<BillList />} />
        <Route path="payamount" element={<PayAmount />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="paymentmode" element={<ModeOfPayment />} />
        <Route path="cardpayment" element={<CardPayment />} />
        <Route path="paymentsuccessful" element={<PaymentSuccessful />} />
        {/* Quick Pay routes end */}

        {/* User profile page start  */}
        <Route element={<UserLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wastebills" element={<Wastebills />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="view-history" element={<ViewProperty />} />
            <Route path="supportx" element={<Supportx />} />
            <Route path="contactus" element={<ContactUs />} />
            {/* <Route path="reports" element={<CustomerReports />} /> */}
          </Route>
        </Route>

        {/* User profile page end  */}
        <Route element={<LoginProtect />} >
          <Route path="support-login" element={<SupportLogin />} />

        <Route element={<ProtectedRoutes />}>
          <Route
            path="support/*"
            element={
              <SupportLayout>
                <Routes>
                  <Route path="" element={<SupportDashboard />} />
                  <Route path="tickets" element={<Tickets />} />
                  <Route
                    path="billing-customer-all"
                    element={<AllCustomers />}
                  />
                  {/* <Route
                    path="billing-customer-details"
                    element={<Customer />}
                  /> */}
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<All />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="user-access" element={<UserAccess />} />
                  <Route path="security" element={<Security />} />
                  <Route path="company-settings" element={<CompanyProfile />} />
                  <Route
                    path="notification-settings"
                    element={<NotificationSettings />}
                  />
                  <Route path="app-settings" element={<AppSettings />} />
                </Routes>
              </SupportLayout>
            }
          />
        </Route>
        
        </Route>

        {/* Operator routes start */}
        <Route element={<AdminLoginProtect />}>
          <Route path="operator-login" element={<OperatorLogin />} />
          <Route path="operator-register" element={<OperatorReg />} />
          <Route
            path="operator-forgot-password"
            element={<OperatorForgotPassword />}
          />
          <Route
            path="operator-reset-password/:userId/:token"
            element={<OperatorResetPassword />}
          />
          <Route path="operator-overview" element={<Overview />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route
            path="operator/*"
            element={
              <OperatorLayout>
                <Routes>
                  <Route path="" element={<Dash />} />
                  <Route path="revenue" element={<RevenueIndex />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="records" element={<Records />} />
                  <Route path="billing" element={<Transaction />} />
                  <Route
                    path="/properties/*"
                    element={
                      <PropertiesLayout>
                        <Routes>
                          <Route path="" element={<Properties />} />
                          <Route path=":propertyId" element={<Property />} />
                          <Route
                            path=":propertyId/apartments/:apartmentId"
                            element={<ApartmentBill />}
                          />
                        </Routes>
                      </PropertiesLayout>
                    }
                  />
                  <Route
                    path="billing-customer-all"
                    element={<AllCustomers />}
                  />
                  {/* <Route
                    path="billing-customer-details"
                    element={<Customer />}
                  /> */}
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<All />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="user-access" element={<UserAccess />} />
                  <Route path="security" element={<Security />} />
                  <Route path="company-settings" element={<CompanyProfile />} />
                  <Route
                    path="notification-settings"
                    element={<NotificationSettings />}
                  />
                  <Route path="app-settings" element={<AppSettings />} />
                </Routes>
              </OperatorLayout>
            }
          />
        </Route>

        
        {/* Operator routes end */}
        
        {/* SuperAdmin routes start */}
                <Route element={<SuperAdminLoginProtect />}>
          {/* <Route path="superadmin-login" element={<AdminLogin />} /> */}
          {/* <Route path="admin-register" element={<AdminReg />} /> */}
          {/* <Route
            path="admin-forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route
            path="admin-reset-password/:userId/:token"
            element={<AdminResetPassword />}
          /> */}
          {/* <Route path="admin-overview" element={<Overview />} /> */}
        </Route>
                <Route element={<ProtectedRoutes />}>
          <Route
            path="admin/dashboard/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="" element={<Dash />} />
                  <Route path="revenue" element={<RevenueIndex />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="records" element={<Records />} />
                  <Route path="billing" element={<Transaction />} />
                  <Route
                    path="/properties/*"
                    element={
                      <PropertiesLayout>
                        <Routes>
                          <Route path="" element={<Properties />} />
                          <Route path=":propertyId" element={<Property />} />
                          <Route
                            path=":propertyId/apartments/:apartment"
                            element={<ApartmentBill />}
                          />
                        </Routes>
                      </PropertiesLayout>
                    }
                  />
                  <Route
                    path="billing-customer-all"
                    element={<AllCustomers />}
                  />
                  {/* <Route
                    path="billing-customer-details"
                    element={<Customer />}
                  /> */}
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<All />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="user-access" element={<UserAccess />} />
                  <Route path="security" element={<Security />} />
                  <Route path="company-settings" element={<CompanyProfile />} />
                  <Route
                    path="notification-settings"
                    element={<NotificationSettings />}
                  />
                  <Route path="app-settings" element={<AppSettings />} />
                </Routes>
              </AdminLayout>
            }
          />

                    <Route
            path="/super-admin/dashboard/*"
            element={
              <SuperAdminLayout>
                <Routes>
                  <Route path="" element={<Dash />} />
                  <Route path="revenue" element={<RevenueIndex />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="records" element={<Records />} />
                  <Route path="billing" element={<Transaction />} />
                  <Route
                    path="/properties/*"
                    element={
                      <PropertiesLayout>
                        <Routes>
                          <Route path="" element={<Properties />} />
                          <Route path=":propertyId" element={<Property />} />
                          <Route
                            path=":propertyId/apartments/:apartment"
                            element={<ApartmentBill />}
                          />
                        </Routes>
                      </PropertiesLayout>
                    }
                  />
                  <Route
                    path="billing-customer-all"
                    element={<AllCustomers />}
                  />
                  {/* <Route
                    path="billing-customer-details"
                    element={<Customer />}
                  /> */}
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<All />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="user-access" element={<UserAccess />} />
                  <Route path="security" element={<Security />} />
                  <Route path="company-settings" element={<CompanyProfile />} />
                  <Route
                    path="notification-settings"
                    element={<NotificationSettings />}
                  />
                  <Route path="app-settings" element={<AppSettings />} />
                </Routes>
              </SuperAdminLayout>
            }
          />


        </Route>
      </Routes>
    </>
  );
};

export default App;

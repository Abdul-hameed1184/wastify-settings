import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import ScrolltoTop from "./Component/ScrolltoTop";
import SignUp from "./Pages/Auth/SignUp";
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
import Support from "./Pages/UserProfile/Support";
import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import Overview from "./Pages/Admin/Overview";
import AdminReg from "./Pages/Admin/Auth/AdminReg";
import AdminLayout from "./Layouts/AdminLayout";
import Dash from "./Pages/Admin/Dashboard/Dash";
import RevenueIndex from "./Pages/Admin/Revenue/RevenueIndex";
import Records from "./Pages/Admin/Customers/Records";
import Transaction from "./Pages/Admin/Billing/Transaction";
import Reports from "./Pages/Admin/Customers/Reports";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import axios from "axios";
import LoginProtect from "./utils/LoginProtect";
import AdminLoginProtect from "./utils/AdminLoginProtect";
import All from "./Pages/Admin/Settings/All";
import Pricing from "./Pages/Admin/Settings/Pricing";
import ResetPassword from "./Pages/Auth/ResetPassword";
import SendRestLink from "./Pages/Auth/SendRestLink";
import AdminForgotPassword from "./Pages/Admin/Auth/AdminForgotPassword";
import AdminResetPassword from "./Pages/Admin/Auth/AdminResetPassword";
import ResetPasswordVerify from "./Pages/Auth/ResetPasswordVerify";
import Customer from "./Pages/Admin/Billing/Customer";
import AllCustomers from "./Pages/Admin/Billing/AllCustomers";


function App() {
  const navigate = useNavigate();
  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('SESSION_AUTH_TOKEN');
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('SESSION_AUTH_TOKEN')
        navigate('/login');

      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      {/* UseNavigate in reaxct pass static parameters needed for the next route through it  */}
      <ScrolltoTop />
      <Routes>
        {/* Auth routes start */}
        <Route path="/" element={<Home />} />
        <Route element={<LoginProtect />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forget-password" element={<SendRestLink />} />
          <Route path="forget-password-verify" element={<ResetPasswordVerify />} />
          <Route path="verifyotp" element={<VerifyOtp />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="propertyunit" element={<PropertyUnit />} />
          <Route path="propertyaccount" element={<PropertyAccount />} />
          <Route path="propertyreview" element={<PropertyPreview />} />
          <Route path="completed" element={<SignUpComplete />} />
        </Route>
        {/* Auth routes end  */}


        {/* Quick Pay routes start */}
        <Route path="currentbills" element={<BillList />} />
        <Route path="payamount" element={<PayAmount />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="paymentmode" element={<ModeOfPayment />} />
        <Route path="cardpayment" element={<CardPayment />} />
        <Route path="paymentsuccessful" element={<PaymentSuccessful />} />
        {/* Quick Pay routes end */}

        {/* User profile page start  */}
        <Route element={<ProtectedRoutes />}>
          <Route path="profile" element={<Profile />} />
          <Route path="wastebills" element={<Wastebills />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="view-history" element={<ViewProperty />} />
          <Route path="support" element={<Support />} />
        </Route>
        {/* User profile page end  */}

        {/* Admin routes start */}
        <Route element={<AdminLoginProtect />}>
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="admin-register" element={<AdminReg />} />
          <Route path="admin-forgot-password" element={<AdminForgotPassword />} />
          <Route path="admin-reset-password/:userId/:token" element={<AdminResetPassword />} />
          <Route path="admin-overview" element={<Overview />} />


        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route
            path='/dashboard/*'
            element={
              <AdminLayout>
                <Routes>
                  <Route path="" element={<Dash />} />
                  <Route path="revenue" element={<RevenueIndex />} />
                  <Route path="records" element={<Records />} />
                  <Route path="billing" element={<Transaction />} />
                  <Route path="billing-customer-all" element={<AllCustomers />} />
                  <Route path="billing-customer-details" element={<Customer />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<All />} />
                  <Route path="pricing" element={<Pricing />} />
                </Routes>
              </AdminLayout>
            }
          />

        </Route>
        {/* Admin routes end */}
      </Routes>
    </>
  );
}

export default App;

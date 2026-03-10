import { Routes, Route } from "react-router-dom";
import ScrolltoTop from "./Component/ScrolltoTop";


// layouts
import UserLayout from "./Layouts/UserLayout";
import OperatorLayout from "./Layouts/OperatorLayout";

// guards
import ProtectedRoutes from "./utils/ProtectedRoutes";
import LoginProtect from "./utils/LoginProtect";
import AdminLoginProtect from "./utils/AdminLoginProtect";
import SuperAdminLoginProtect from "./utils/SuperAdminLoginProtect";

// pages (shortened list for clarity)
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/UserProfile/Dashboard";
import Dash from "./Pages/Operator/Dashboard/Dash";
import RevenueIndex from "./Pages/Operator/Revenue/RevenueIndex";
import Customers from "./Pages/Operator/Customers/Customers";
import OperatorLogin from "./Pages/Operator/Auth/OperatorLogin";
import SupportLogin from "./Pages/Support/Auth/SupportLogin";
import { OperatorTransactions } from "./Pages/Operator/OperatorTransactions/OperatorTransactions";
import { OperatorSettings } from "./Pages/Operator/Settings/Settings";
import { Complaint } from "./Pages/Operator/Complaint/Complaints";
import Properties from "./Pages/Operator/Customers/Properties";
import Wastebills from "./Pages/UserProfile/Wastebills";
import PaymentHistory from "./Pages/UserProfile/PaymentHistory";
import Profile from "./Pages/UserProfile/Profile";
import ContactUs from "./Pages/UserProfile/Contact";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from "react-toastify";
import { OperatorRegister } from "./Pages/Operator/Auth/OperatorRegister";
import AdminResetPassword from "./Pages/Operator/Auth/OperatorResetPassword";
import PropertiesLayout from "./Layouts/PropertiesLayout";
import Property from "./Pages/Operator/Customers/Property";
import ApartmentBill from "./Pages/Operator/Customers/ApartmentBill";


const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Zoom}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="bg-gradient-to-r from-indigo-500 to-blue-500 text-sm text-white shadow-lg"
      />

      <ScrolltoTop />


      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />

        {/* ===== AUTH ===== */}
        <Route element={<LoginProtect />}>
          <Route path="login" element={<Login />} />
          <Route path="support-login" element={<SupportLogin />} />
        </Route>

        {/* ===== USER ===== */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<UserLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="wastebills" element={<Wastebills />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contactus" element={<ContactUs />} />
          </Route>
        </Route>

        {/* ===== OPERATOR AUTH ===== */}
        <Route element={<AdminLoginProtect />}>
          <Route path="operator-login" element={<OperatorLogin />} />
          <Route path="operator-register" element={<OperatorRegister />} />
          <Route path="admin-reset-password/:userId/:token" element={<AdminResetPassword />} />
        </Route>

        {/* ===== OPERATOR ===== */}
        <Route element={<ProtectedRoutes />}>
          <Route path="operator" element={<OperatorLayout />}>
            <Route index element={<Dash />} />
            <Route path="dashboard" element={<Dash />} />
            <Route path="revenue" element={<RevenueIndex />} />
            <Route path="customers" element={<Customers />} />
            <Route path="transactions" element={<OperatorTransactions />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="settings" element={<OperatorSettings />} />

  
             <Route path="properties" element={<PropertiesLayout />}>
              <Route index element={<Properties />} />
              <Route path=":propertyId" element={<Property />} />
              <Route
                path=":propertyId/apartments/:apartmentId"
                element={<ApartmentBill />}
              />
            </Route>
          </Route>
        </Route>

        {/* ===== SUPPORT ===== */}
        <Route element={<ProtectedRoutes />}>
          {/* <Route path="support" element={<SupportLayout />}>
            <Route index element={<SupportDashboard />} />
            <Route path="tickets" element={<Tickets />} />
          </Route> */}
        </Route>

        {/* ===== SUPER ADMIN ===== */}
        <Route element={<SuperAdminLoginProtect />}>
          <Route element={<ProtectedRoutes />}>
            {/* <Route path="super-admin" element={<AdminLayout />}>
              <Route index element={<AdminDash />} />
            </Route> */}
          </Route>
        </Route>

      </Routes>
    </>
  );
};

export default App;

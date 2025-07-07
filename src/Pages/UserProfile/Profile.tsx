import React, { useEffect, useState } from "react";

import {  useNavigate } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import { customerDashboard } from "../../api/customer/customer.service";

import ProfileCard from "../../Component/Card/ProfileCard";
import ProfileSlider from "../../Component/Slider/ProfileSlider";

import { ICustomerDashboard } from "../../models/customerdash.interface";

const Profile: React.FC = () => {
  const [dashboard, setDashboard] = useState<ICustomerDashboard>({} as ICustomerDashboard);
  const navigate = useNavigate();
  const logout = useLogout();


  const handleLogout = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const stored = sessionStorage.getItem("AUTH_USERDETAILS");
        if (!stored) throw new Error("User session not found");

        const customer = JSON.parse(stored);
        if (!customer?.customerId) throw new Error("Invalid customer data");

        const response = await customerDashboard(customer.customerId);
        setDashboard(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
        handleLogout(); // Optionally redirect on invalid session
      }
    };

    fetchDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-green bg-no-repeat py-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        <ProfileCard dashBoard={dashboard} />

        <div className="flex-1 w-full max-w-4xl">
          <div className="p-4">
            <ProfileSlider />
          </div>
        </div>
      </div>
    </main>
  );
};

// import React, { useEffect, useState } from "react";
// import Swiper from "swiper";

// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { customerDashboard } from "../../api/customer/customer.service";
// import { ICustomerDashboard } from "../../models/customerdash.interface";

// const Profile: React.FC = () => {
//   const [dash, setDash] = useState<ICustomerDashboard>({} as ICustomerDashboard);
//   const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");

//   useEffect(() => {
//     (async () => {
//       const res = await customerDashboard(customer.customerId);
//       setDash(res.data.data);
//     })();
//   }, []);

//   return (
//     <main className="min-h-screen bg-green py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <ProfileCard dashBoard={dash} />
//         </div>

//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           className="rounded-xl shadow-lg"
//         >
//           <SwiperSlide>
//             <div className="bg-white p-10 rounded-xl text-center">
//               <h2 className="text-2xl font-bold mb-2 text-green-800">Your Waste Summary</h2>
//               <p className="text-lg text-gray-700">
//                 You’ve paid ₦{Number(dash.totalBills || 0).toLocaleString()} for waste in total.
//               </p>
//               <p className="mt-4 text-sm text-gray-500">Keep up the good work in maintaining your property clean.</p>
//             </div>
//           </SwiperSlide>

//           <SwiperSlide>
//             <div className="bg-white p-10 rounded-xl text-center">
//               <h2 className="text-2xl font-bold mb-2 text-green-800">Apartments Overview</h2>
//               <p className="text-lg text-gray-700">
//                 You have {dash.totalApartment} registered apartment{dash.totalApartment === 1 ? "" : "s"}.
//               </p>
//               <p className="mt-4 text-sm text-gray-500">
//                 View their individual history to ensure bills are up to date.
//               </p>
//             </div>
//           </SwiperSlide>

//           <SwiperSlide>
//             <div className="bg-white p-10 rounded-xl text-center">
//               <h2 className="text-2xl font-bold mb-2 text-green-800">Tips for Responsible Waste Management</h2>
//               <ul className="list-disc list-inside text-left text-gray-700 mt-4 space-y-2">
//                 <li>Separate recyclables from regular waste.</li>
//                 <li>Ensure timely bill payments to avoid surcharges.</li>
//                 <li>Use designated bags or bins for each apartment.</li>
//               </ul>
//             </div>
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </main>
//   );
// };

// export default ProfileSlider;


export default Profile;

import React from "react";
import { Logo } from "../../Component/Logo";
import { ParagraphLargeGreen, ParagraphSmall } from "../../Component/Paragraph";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <main className="p-10">
      <div className="flex items-center justify-center mt-10 lg:justify-start">
        <div className="w-12 h-10">
          <Logo />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-around py-20">
        <div className=" hidden lg:block w-2/5">
          <img src="Images/admin.png" alt="icon" srcSet="" />
        </div>
        <div className="text-center lg:text-start w-full lg:w-5/12">
          <ParagraphSmall content={"Welcome to"} />
          <ParagraphLargeGreen content={"Wasteefy Management System"} />
          <ParagraphSmall
            content={`Welcome to Wasteefy's Operator Dashboard!
Effortlessly manage and oversee your customers' operations all in one place. Access your database, regulate services, and gain insights through our intuitive dashboard`}
          />
          <div className="flex flex-col lg:flex-row lg:my-20 gap-10 text-center">
            <Link
              to="/admin-login"
              className="text-white bg-gray w-full lg:w-5/12 h-14 justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border"
            >
              Login
            </Link>
            <Link
              to="/admin-register"
              className="text-white bg-green w-full  lg:w-5/12 h-14  justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Overview;

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SupportModal from "../Component/SupportModal";

const Layout = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const changeView = () => {
    setOpenModal((prevState) => !prevState);
    console.log("clicked change");
  };

  return (
    <>
      <Navbar />
      <main>
        {children}
        <button className="fixed bottom-[10%] right-[5%]" onClick={changeView}>
          <img src="Images/supportImage.png" alt="Support Image" srcSet="" />
        </button>
        <SupportModal openModal={openModal} setOpenModal={setOpenModal} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

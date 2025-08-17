import  { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SupportModal from "../Component/SupportModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
          <img src="Images/supportImage.png" alt="Support" srcSet="" />
        </button>
        <SupportModal openModal={openModal} setOpenModal={setOpenModal} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

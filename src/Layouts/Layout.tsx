import  { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SupportModal from "../Component/SupportModal";
import { IoChatboxEllipses } from "react-icons/io5";

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
      <main className="w-full pt-32">
        {children}
        <button className="fixed bottom-4 text-center bg-white rounded-xl p-2 right-4" onClick={changeView}>
          <div className="flex flex-row items-center">
          <IoChatboxEllipses className="text-green text-center text-4xl" />
          <h4 className="text-lg w-18 text-gray text-center font-bold">Chat us</h4>
                  </div>
        </button>

        <SupportModal openModal={openModal} setOpenModal={setOpenModal} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

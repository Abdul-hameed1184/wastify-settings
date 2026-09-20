import  { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoChatboxEllipses } from "react-icons/io5";
import { SupportModal } from "../Component/SupportModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>

      <main className="w-full pt-32 bg-white">
              <Navbar />
        {children}
        <button className="fixed bottom-4 text-center bg-white rounded-xl p-2 right-4" onClick={() => setOpenModal(!openModal)}>
          <div className="flex flex-row items-center">
          <IoChatboxEllipses className="text-green text-center text-4xl" />
          <h4 className="text-lg w-18 text-gray text-center font-bold">Send Mail</h4>
                  </div>
        </button>

      <SupportModal openModal={openModal} setOpenModal={() => setOpenModal(!openModal)} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

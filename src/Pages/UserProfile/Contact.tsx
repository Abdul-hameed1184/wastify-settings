import React from "react"
import { IoLogoFacebook, } from "react-icons/io5";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiCustomerServiceFill, RiTwitterXLine } from "react-icons/ri";

const ContactUs:React.FC = () => {


    return (
                <div className="text-white bg-green h-screen space-y-4 px-4 flex flex-col justify-between">
                  <div>
            <div className="my-4">
                 <h2 className="text-2xl text-black font-bold">Contacts</h2>
            </div>
    <div className="mb-4">
    <Link
      to="https://www.facebook.com/yourPage"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <IoLogoFacebook className="text-2xl text-black" />
      <p className="text-black font-semibold text-xl">Facebook</p>
    </Link>
    </div>
    <div className="mb-4">
    <Link
      to="https://twitter.com/yourHandle"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <RiTwitterXLine className="text-black text-2xl" />
      <p className="text-black font-semibold text-xl">Twitter</p>
    </Link>
    </div>
    <div className="mb-4">
    <Link
      to="mailto:support@example.com"
      className="flex items-center space-x-3"
    >
      <IoIosMail className="text-black text-2xl" />
      <p className="text-black font-semibold text-xl">Email</p>
    </Link>
    </div>
    <div className="mb-4">
    <Link
      to="https://wa.me/2348012345678"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <IoLogoWhatsapp className="text-2xl text-black" />
      <p className="text-black font-semibold text-xl">WhatsApp</p>
    </Link>
    </div>
    <div>
    <Link to="tel:+2348012345678" className="flex items-center space-x-3">
      <RiCustomerServiceFill className="text-black text-2xl" />
      <p className="text-black font-semibold text-xl">Call Us</p>
    </Link>
    </div>

  </div>
  </div>
    )
}


export default ContactUs;
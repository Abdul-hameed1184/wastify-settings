import { CiLocationOn, CiMail } from "react-icons/ci";

import {
  AiFillFacebook, AiOutlineInstagram} from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { LogoWithText } from '../Component/Logo';
import { MdOutlineLocalPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className=' md:p-14 bg-black px-8 py-5 flex flex-col md:text-lg text-sm'>
      <div className='flex flex-col md:flex-row '>
      <div className='flex flex-col flex-grow'>
      <Link to="/" className="w-14 h-14" >
    
          <LogoWithText />
      </Link>
      <div className='ml-4 text-gray-200 mt-4  text-gray-500'>
      <p className='my-4'>The modern platform for digital waste bill
management. Simplify payments, track usage, and stay compliant.</p>
<p className='mt-4 flex flex-row gap-2 items-center'><span><CiMail className='text-xl'/></span><span>support@wasteefy.com</span></p>
<p className='mt-4 flex flex-row gap-2 items-center'><span><MdOutlineLocalPhone  className='text-xl' /></span>09131415012</p>
<p className='mt-4 flex flex-row gap-2 items-center'><span><CiLocationOn  className='text-xl'/></span>Hello@wasteefy.com</p>
    </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 md:mt-0 w-full flex-wrap justify-between'>
      <div className='text-gray-500 flex-1 flex flex-col mt-4 gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Product</h4>
        <p>Features</p>
        <p>Pricing</p>
        <p>How It Works</p>
        <p>API Documentation</p>
      </div>
        <div className='text-gray-500 mt-4 flex-1 flex flex-col gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Company</h4>
        <p>About Us</p>
        <p>Careers</p>
        <p>Press</p>
        <p>Contact</p>
      </div>
      <div className='text-gray-500 mt-4 flex-1 flex flex-col gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Resources</h4>
        <p>Help Center</p>
        <p>Blog</p>
        <p>Community</p>
        <p>Webinars</p>
      </div>
      <div className='text-gray-500 mt-4 flex-1 flex flex-col gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Legal</h4>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Cookie Policy</p>
        <p>GDPR</p>
      </div>
      </div>
    </div>
    <div className='flex flex-col md:flex-row items-center justify-center md:justify-between mt-20'>
      <div className='text-gray-500 flex flex-row md:flex-col gap-4 md:justify-right justify-center tracking-tight'>
        <p className='text-center md:text-right text-sm mb-4 '>&copy; 2025 Wasteefy. All rights reserved.</p>
        </div>
        <div className="text-gray-500 font-bold text-xl flex flex-row gap-2">
          <span><FaXTwitter /></span>
          <span><AiOutlineInstagram /></span>
          <span><AiFillFacebook /></span>
        </div>
    </div>
    
    </footer>
  )
}

export default Footer
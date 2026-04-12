import { CiLocationOn, CiMail } from "react-icons/ci";

import {
  AiFillFacebook, AiOutlineInstagram} from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom'
import { LogoWithText } from '../Component/Logo';
import { MdOutlineLocalPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className=' md:p-14 bg-black px-8 py-5 flex flex-col md:text-lg text-sm'>
      <div className='flex flex-col md:flex-row '>
      <div className='flex flex-col flex-grow'>
      <Link to="/" className="w-14 h-14 cursor-pointer" >
    
          <LogoWithText />
      </Link>
      <div className='ml-4 text-gray-200 mt-4  text-gray-500' id="contact">
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
        <NavLink to="/#features" className="cursor-pointer">Features</NavLink>
        <NavLink to="/pricing" className="cursor-pointer">Pricing</NavLink>
        <NavLink to="/#howItWorks" className="cursor-pointer">How It Works</NavLink>
        <NavLink to="/faq" className="cursor-pointer">FAQ</NavLink>
      </div>
        <div className='text-gray-500 mt-4 flex-1 flex flex-col gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Company</h4>
        <NavLink to="/about" className="cursor-pointer">About Us</NavLink>
        <NavLink to="/careers" className="cursor-pointer">Careers</NavLink>
        <NavLink to="/press" className="cursor-pointer">Press</NavLink>
        <NavLink to="/contact" className="cursor-pointer">Contact</NavLink>
      </div>
      <div className='text-gray-500 mt-4 flex-1 flex flex-col gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Resources</h4>
        <NavLink to="/help" className="cursor-pointer">Help Center</NavLink>
        <NavLink to="/blog" className="cursor-pointer">Blog</NavLink>
        <NavLink to="/community" className="cursor-pointer">Community</NavLink>
        <NavLink to="/webinars" className="cursor-pointer">Webinars</NavLink>
      </div>
      <div className='text-gray-500 mt-4 flex-1 flex flex-col gap-4 tracking-tight'>
        <h4 className='text-white font-bold mb-2'>Legal</h4>
        <NavLink to="/privacy" className="cursor-pointer">Privacy Policy</NavLink>
        <NavLink to="/terms" className="cursor-pointer">Terms of Service</NavLink>
        <NavLink to="/cookies" className="cursor-pointer">Cookie Policy</NavLink>
        <NavLink to="/gdpr" className="cursor-pointer">GDPR</NavLink>
      </div>
      </div>
    </div>
    <div className='flex flex-col md:flex-row items-center justify-center md:justify-between mt-20'>
      <div className='text-gray-500 flex flex-row md:flex-col gap-4 md:justify-right justify-center tracking-tight'>
        <p className='text-center md:text-right text-sm mb-4 '>&copy; 2025 Wasteefy. All rights reserved.</p>
        </div>
        <div className="text-gray-500 font-bold text-xl flex flex-row gap-2">
          <span><NavLink to="https://x.com/wasteefy"  target="_blank" rel="noopener noreferrer"><FaXTwitter /></NavLink></span>
          <span><NavLink to="https://instagram.com/wasteefy"  target="_blank" rel="noopener noreferrer"><AiOutlineInstagram /></NavLink></span>
          <span><NavLink to="https://facebook.com/wasteefy"  target="_blank" rel="noopener noreferrer"><AiFillFacebook /></NavLink></span>
        </div>
    </div>
    
    </footer>
  )
}

export default Footer
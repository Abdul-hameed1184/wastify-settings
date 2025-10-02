import React from 'react'
import {
  AiFillFacebook, AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillLinkedin
} from "react-icons/ai"
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ParagraphExtraSmall, ParagraphSmall, ParagraphSmall2White, ParagraphXl, ParagraphXlWhite, Paragraphbase2White } from '../Component/Paragraph'
import { Link } from 'react-router-dom'
import { Logo, LogoTrans } from '../Component/Logo';

const Footer = () => {
  return (
    <main className=' md:p-14 bg-black px-8 py-5'>

      <Link to="/"  >
        <div className="w-14 h-14">
          <LogoTrans />
        </div>
      </Link>
      <Paragraphbase2White content={"Waste payment made easy"} />
      <div className="mt-5 md:flex md:flex-col justify-between">
        <div className="">
          <ParagraphXlWhite content={"Follow us"} />
          <div className=" h-10 w-full flex my-4">
            <div className="w-8 h-8 bg-green rounded-full flex justify-center items-center">
              <AiFillFacebook size={20} className="text-black  cursor-pointer" />
            </div>
            <div className="w-8 h-8 bg-green rounded-full ml-5 flex justify-center items-center">
              <AiOutlineInstagram size={20} className="text-black  cursor-pointer " />
            </div>
            <div className="w-8 h-8 bg-green rounded-full ml-5 flex justify-center items-center">
              <FaXTwitter size={20} className="text-black  cursor-pointer " />
            </div>
            <div className="w-8 h-8 bg-green rounded-full ml-5 flex justify-center items-center">
              <AiOutlineTwitter size={20} className="text-black  cursor-pointer  " />
            </div>
            <div className="w-8 h-8 bg-green rounded-full ml-5 flex justify-center items-center ">
              <AiFillLinkedin size={20} className="text-black  cursor-pointer  " />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-60 md:mt-10">
          <div className="">
            <ParagraphXlWhite content={"Learn"} />
            <div className="flex flex-col">
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>Blog</Link>
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>FAQ</Link>
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>About Us</Link>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <ParagraphXlWhite content={"Legal"} />
            <div className="flex flex-col">
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>Terms of use</Link>
              <Link to={"/"} className=' py-2 text-base font-Poppins font-normal leading-5 text-white'>Privacy</Link>
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>Wasteefy Merchant <ParagraphExtraSmall content={"Coming Soon"} /></Link>

            </div>

          </div>
          <div className="mt-6 md:mt-0">
            <ParagraphXlWhite content={"Contact"} />
            <div className="flex flex-col">
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>Hello@wasteefy.com</Link>
              <Link to={"/"} className='py-2 text-base font-Poppins font-normal leading-5 text-white'>22, Iseyin Street, Palmgrove, Lagos, Nigeria.</Link>
              {/* <Link to={"/"} className='p-4'>About Us</Link> */}
            </div>

          </div>
        </div>
        <div className="text-center mt-6 md:text-end">
          <ParagraphXlWhite content={"Download now"} />
          <div className="flex md:hidden m-4 gap-3 md:justify-end md:items-end md:w-1/2">
            <div className="w-1/2 text-center md:w-full ">
              <button className='bg-white rounded-lg border w-full h-16 border-white flex gap-3 py-3 px-2'>
                <img src="Images/playstore.png" alt="" className='w-8 h-8' />
                <div className="">
                  <p className='text-xxs text-start font-Poppins font-light text-black leading-3'>GET IT ON</p>
                  <p className='text-sm text-start font-Poppins font-semibold text-black leading-6'>Google Play</p>
                </div>
              </button>
              <ParagraphExtraSmall content={"Coming Soon"} />
            </div>
            <div className="w-1/2 text-center md:w-full">
              <button className='bg-white rounded-lg border full h-16 border-white flex gap-3 p-3'>
                <FaApple className='w-8 h-8' />
                <div className="">
                  <p className='text-xxs text-start font-Poppins font-light text-black leading-3'>Download on</p>
                  <p className='text-sm text-start font-Poppins font-semibold text-black leading-6'>App Store</p>
                </div>
              </button>
              <ParagraphExtraSmall content={"Coming Soon"} />
            </div>
          </div>
          <div className="hidden md:flex gap-5 justify-end item-center mt-2">
             {/* <p className='text-white'>LIve</p> */}
                <div className="w-1/2 text-center md:w-[12%]">
              <button className='bg-white rounded-lg border w-full h-16 border-white flex gap-3 py-3 px-2'>
                <img src="Images/playstore.png" alt="" className='w-8 h-8' />
                <div className="">
                  <p className='text-xxs text-start font-Poppins font-light text-black leading-3'>GET IT ON</p>
                  <p className='text-sm text-start font-Poppins font-semibold text-black leading-6'>Google Play</p>
                </div>
              </button>
              <ParagraphExtraSmall content={"Coming Soon"} />
            </div>
            <div className="w-1/2 text-center md:w-[10.5%]">
              <button className='bg-white rounded-lg border full h-16 border-white flex gap-3 p-3'>
                <FaApple className='w-8 h-8' />
                <div className="">
                  <p className='text-xxs text-start font-Poppins font-light text-black leading-3'>Download on</p>
                  <p className='text-sm text-start font-Poppins font-semibold text-black leading-6'>App Store</p>
                </div>
              </button>
              <ParagraphExtraSmall content={"Coming Soon"} />
            </div>
          </div>
           
        </div>
      </div>
      <div className="pt-4  md:pt-8 text-center">
        <hr className='text-white' />
        <p className="text-base text-white mt-2" > <span className="w-5 h-5">&copy; </span> 2023 All rights reserved</p>
      </div>
    </main>
  )
}

export default Footer
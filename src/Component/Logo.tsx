import React from 'react'
import img from "../assets/images/WasteefyLogo.png"
type LogoProps = {
  size?: number;
  textSize?: number;
  className?: string;
};
 export const Logo:React.FC<LogoProps> = ({size=100}) => {
  return (
    <img src={img}  width={size} alt='Wasteefy logo' />
  )
}
 export const LogoTrans = () => {
  return (
    <img src='/Images/logoTransparent.png' className='w-full h-full ' alt='Wasteefy logo' />
  )
}
 export const LogoWhite = () => {
  return (
    <img src='/Images/logoWhite.png' className='w-full h-full ' alt='Wasteefy logo' />
  )
}


export const LogoWithText: React.FC<LogoProps> = ({
  size = 40,
  textSize = 24,
    className,
}) => {
  return ( 
    <div className={`flex items-center ${className}`}>
      <Logo size={size} />
      <span className={`ml-2 font-poppins font-semibold text-gray-800`} style={{ fontSize: textSize }}>
        <span className='text-green font-bold'>Was</span><span className="text-gray-700 font-bold">teefy</span>
      </span>
    </div>
  );
}
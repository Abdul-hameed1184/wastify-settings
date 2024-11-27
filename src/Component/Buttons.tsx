import React from 'react'

export const ButtonsPrimary = ({type, onClick, name, loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-green  w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-green'}`}
    disabled={loading}
>
    { loading ? "Loading... " : name }
</button>
  )
}
export const ButtonsPrimaryBlack = ({type, onClick, name, loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-black  w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-black'}`}
    disabled={loading}
>
    { loading ? "Loading... " : name }
</button>
  )
}
export const ButtonsPrimaryIcon = ({type, onClick, name, icon, loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-green  w-full h-14 inline-flex justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-green'}`}
    disabled={loading}
>
  { loading ? "Loading... " : name } {icon}
</button>
  )
}
export const ButtonsSecondary = ({type, onClick, name, loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-gray  w-full h-14  justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightgray' : 'bg-gray'}`}
    disabled={loading}
>
    {name}
</button>
  )
}
export const ButtonsSecondaryIcon = ({type, onClick, name, icon,loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-gray  w-full h-14 inline-flex justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightgray' : 'bg-gray'}`}
    disabled={loading}
>
    {name} 
    
    {icon}
</button>
  )
}
export const ButtonsWhite = ({type, onClick, name,loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className='text-gray bg-white  w-full h-14  justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border'
    disabled={loading}
>
    {name}
</button>
  )
}


export const Button = ({type, onClick, name,loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white font-weight-bold bg-green my-4 w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-green'}`}
    disabled={loading}
>
    {name}
</button>
  )
}

/* eslint-disable no-unused-vars */
import React from 'react'

type Props = {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  required?: boolean;
  list?: string;
  disabled?: boolean;
  className?: string
};

export const InputField:React.FC<Props> = ({ type, name, value, placeholder, onChange, error, required=false, list="" }) => {
    return (
      <input type={type} list={list} name={name} value={value} placeholder={placeholder} onChange={onChange} required={required}  
      className={`border px-2.5 py-3.5 pl-8  bg-lightGreen shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-lightGreen border-transparent placeholder:text-gray focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray  ${ error ? 'focus:ring-error' : 'focus:ring-gray'}`} />
    )
  }

export const InputFieldGray:React.FC<Props> = ({ type, name, value, placeholder, onChange, error, disabled }) => {
    return (
      <input type={type} name={name} value={value} placeholder={placeholder} disabled={disabled} onChange={onChange}  className={`border px-2.5 py-3.5 pl-8  bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-grayInput border-transparent placeholder:text-black focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-grayInput  ${ error ? 'focus:ring-error' : 'focus:ring-grayInput'}`} />
    )
  }
export const InputFieldGrayHome:React.FC<Props> = ({ type, name, value, placeholder, onChange, error }) => {
    return (
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}  className={`border px-2.5 py-3.5 pl-5  bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-grayInput border-transparent placeholder:text-grayRounded placeholder:tracking-widestSa focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-grayInput  ${ error ? 'focus:ring-error' : 'focus:ring-grayInput'}`} />
    )
  }

export const InputFieldSecondary:React.FC<Props> = ({ type, name, value, placeholder, onChange, error }) => {
    return (
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}  className={`border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-gray focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray  ${ error ? 'focus:ring-error' : 'focus:ring-gray'}`} />
    )
  }

export const InputFieldSecondaryGreen:React.FC<Props> = ({ type, name, value, placeholder, onChange, error }) => {
    return (
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}  className={`border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray  ${ error ? 'focus:ring-error' : 'focus:ring-gray'}`} />
    )
  }

  export const InputFieldGreenWhite:React.FC<Props> = ({ type, name, value, placeholder, onChange, error }) => {
    return (
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}  className={`border-2 border-lightGreen px-2.5 py-3.5 pl-10  bg-white shadow-sm rounded-lg block font-Poppins w-full h-10 text-black text-base mt-1 ring-lightGreen placeholder:text-black focus:outline-none focus:ring-2 focus:border-purple focus:border-lightGreen focus:ring-lightGreen  ${ error ? 'focus:ring-error' : 'focus:ring-lightGreen'}`} />
    )
  }


  
  export const Input:React.FC<Props> = ({ type, name, value, placeholder, onChange, onBlur, error, className }) => {
    return (
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur}  
      
      className={`${className} border-2 border-lightGreen  py-2 rounded-sm bg-white shadow-sm rounded-lg block  w-full h-10 text-black text-base mt-1 ring-lightGreen  focus:outline-none focus:ring-2 focus:border-purple focus:border-lightGreen focus:ring-lightGreen  ${ error ? 'focus:ring-error' : 'focus:ring-lightGreen'}`} />
    )
  }         
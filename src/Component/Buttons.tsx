import React, {  ReactNode } from 'react'


type Props = {
  type?: "submit" | "reset" | "button" ;
  onClick?: () => void;
  name: string;
  loading?: boolean;
  icon?:ReactNode;
  disabled?: boolean;
  className?: string
}
export const ButtonsPrimary: React.FC<Props> = ({
  type = 'button',
  onClick,
  name,
  loading = false,
  disabled = false,
}) => {
  const baseClass =
    'w-full flex items-center justify-center px-4 py-4 md:px-2 md:py-2 text-base font-medium rounded-lg shadow-sm border border-transparent font-poppins';
  const enabledClass = 'bg-green text-white hover:bg-green-600';
  const disabledClass = 'bg-lightGreen text-white cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${loading || disabled ? disabledClass : enabledClass}`}
      disabled={loading || disabled}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5 animate-spin text-white fill-green-500"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
            role="status"
            aria-hidden="true"
          >
            <path
              d="M100 50.59c0 27.61-22.39 50-50 50S0 78.2 0 50.59 22.39 0.59 50 0.59 100 22.98 100 50.59zM9.08 50.59c0 22.6 18.32 40.92 40.92 40.92s40.92-18.32 40.92-40.92S72.6 9.67 50 9.67 9.08 27.99 9.08 50.59z"
              fill="currentColor"
            />
            <path
              d="M93.97 39.04c2.43-.64 3.9-3.13 3.05-5.49-1.71-4.73-4.13-9.18-7.19-13.2-3.97-5.23-8.93-9.63-14.6-12.94C69.54 4.1 63.28 1.94 56.77 1.05c-5-.68-10.07-.6-15.03.23-2.47.41-3.92 2.91-3.28 5.33.64 2.42 3.11 3.88 5.59 3.52 3.8-.56 7.67-.58 11.49-.05 5.32.73 10.45 2.5 15.09 5.21 4.64 2.72 8.72 6.31 11.97 10.61 2.34 3.07 4.22 6.46 5.61 10.04.89 2.34 3.35 3.79 5.76 3.14z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </span>
      ) : (
        name
      )}
    </button>
  );
};
export const ButtonsPrimaryBlack:React.FC<Props> = ({type, onClick, name, disabled, loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-black  w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-lg font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-black'} overflow-hidden whitespace-nowrap`}
    disabled={loading || disabled}
>
    { loading ? "Loading... " : name }
</button>
  )
}

export const Buttonx:React.FC<Props> = ({type, onClick, name, disabled, loading, className}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-black  w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-lg font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-black'}  ${className} overflow-hidden whitespace-nowrap`}
    disabled={loading || disabled}
>
    { loading ? "Loading... " : name }
</button>
  )
}



export const ButtonsPrimaryIcon: React.FC<Props> = ({
  type,
  onClick,
  name,
  icon,
  loading,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white w-full h-14 inline-flex justify-center items-center 
        px-4 py-4 text-base font-normal shadow-sm border-transparent rounded-lg 
        font-Poppins overflow-hidden whitespace-nowrap 
        ${loading ? "bg-lightGreen" : "bg-green"}
        focus:outline-none focus:ring-0`}
      disabled={loading}
    >
      <span className="px-2">
        {loading ? "Loading... " : name}
      </span>
      <span>{icon}</span>
    </button>
  );
};

export const ButtonsSecondary:React.FC<Props> = ({type, onClick, name, loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`text-white bg-gray  w-full h-14  justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightgray' : 'bg-gray'} overflow-hidden whitespace-nowrap`}
    disabled={loading}
>
    {name}
</button>
  )
}
export const ButtonsSecondaryIcon:React.FC<Props> = ({type, className, onClick, name, icon,loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`${className} text-white bg-gray  w-full h-14 inline-flex justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightgray' : 'bg-gray'} overflow-hidden whitespace-nowrap`}
    disabled={loading}
>
    {name} 
    
    {icon}
</button>
  )
}
export const ButtonsWhite:React.FC<Props> = ({type, onClick, name,loading}) => {
  return (
    <button type={type} onClick={onClick} 
    className='text-gray bg-white w-full h-14  justify-center px-4 py-4 text-base font-normal shadow-sm ring-gray border-transparent rounded-lg ring-2 font-Poppins border'
    disabled={loading}
>
    {name}
</button>
  )
}


// export const Button:React.FC<Props> = ({type, onClick, name,loading, className}) => {
//   return (
//     <button type={type} onClick={onClick} 
//     className={`${className} text-white px-2 font-weight-bold bg-green my-4 w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-lightGreen': 'bg-green'} overflow-hidden whitespace-nowrap`}
//     disabled={loading}
// >
//     {name}
// </button>
//   )
// }

export const IconButton:React.FC<Props> = ({type, onClick, icon, name,loading, className}) => {
  return (
    <button type={type} onClick={onClick} 
    className={`${className} text-white font-weight-bold text-center vertical-middle my-4 h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border ${loading ? 'bg-red-300': 'bg-red-600'} overflow-hidden whitespace-nowrap`}
    disabled={loading}
>
   <span className="flex">{icon }{name}</span>
</button>
  )
}




import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'light';
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default', icon }) => {
  const baseStyles = "hover:shadow-2xl shadow-xl p-6 rounded-xl m-4 ";
  
  const variants = {
    default: "bg-white/10 border-white/20",
    light: "bg-white/30 border-white/40",
    dark: "bg-black/20 border-white/10 text-white"
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && <div className='p-2 h-12 w-12 bg-green/10 hover:h-16 hover:w-16 hover:bg-green hover:text-white text-green text-2xl hover:text-3xl rounded-3xl flex justify-center items-center text'>{icon}</div>}
      {children}
      </div>

  );
};
interface CardTextIconProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}
export const CardTextIcon:React.FC<CardTextIconProps> = ({icon, title, description, className}) => {
  return (
                <Card icon={icon} className={`leading-relaxed ${className}`}>
                <h3 className="mx-0 my-4 text-left text-2xl font-semibold leading-8">
                  {title}
                </h3>
               <p className="mx-0 my-4 text-left text-gray-500 p-1">
                    {description}
                  </p>
                </Card>
  )
}

export default Card;

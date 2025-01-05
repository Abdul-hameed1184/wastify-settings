import React from 'react';

const Loader:React.FC<{color?: string}> = ({color="green"}) => {
  return (
    <div
    className="flex items-center justify-center min-h-50 bg-gray-100"
  >
    <div className="flex items-center justify-center">
    <div className={`w-16 h-16 border-b-8 border-${color} rounded-full animate-spin`}></div>
    <h3 className={`text-4xl font-bold px-4 animate-bounce text-${color}`}>Wasteefy</h3>
    </div>
  </div>
  );
};

export default Loader;
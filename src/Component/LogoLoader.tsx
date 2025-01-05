import React from 'react';
import { LogoTrans } from './Logo';

const LogoLoader:React.FC = () => {
  return (
    <div
    className="flex items-center justify-center min-h-screen bg-gray-100"
  >
    <div className="flex items-center justify-center">
        <LogoTrans />
    </div>
  </div>
  );
};

export default LogoLoader;
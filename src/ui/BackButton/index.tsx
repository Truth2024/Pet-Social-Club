import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-[30px] h-[30px] rounded-full flex items-center justify-center mr-[10px] hover:bg-gray-200 transition"
    >
      <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
        </g>
      </svg>
    </div>
  );
};

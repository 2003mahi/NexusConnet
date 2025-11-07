
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
};

export default Card;

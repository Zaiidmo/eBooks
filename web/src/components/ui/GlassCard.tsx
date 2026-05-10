import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/20 shadow-lg rounded-xl ${className}`}>
      {children}
    </div>
  );
};
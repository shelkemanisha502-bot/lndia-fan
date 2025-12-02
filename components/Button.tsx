import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-500 text-white focus:ring-purple-500",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500",
    ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white focus:ring-slate-500",
    icon: "bg-transparent hover:bg-white/10 text-white p-2 rounded-full",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${variant !== 'icon' ? sizes[size] : ''} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
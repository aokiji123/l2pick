import React from "react";

interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const MainButton = ({
  children,
  icon,
  className,
  ...props
}: MainButtonProps) => {
  return (
    <button
      {...props}
      className={`relative flex items-center justify-center bg-brand-btn text-white max-w-[343px] w-full h-14 px-12 leading-9 font-extrabold rounded-2xl cursor-pointer z-10 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default MainButton;

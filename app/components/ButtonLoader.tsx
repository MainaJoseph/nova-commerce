import React from "react";
import * as Icons from "react-icons/fc";

interface ButtonLoaderProps {
  label: React.ReactNode;
  disabled?: boolean;
  outline?: boolean;
  google?: boolean;
  clear?: boolean;
  small?: boolean;
  custom?: string;
  icon?: React.ElementType; // Use React.ElementType for the icon prop
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  label,
  disabled,
  outline,
  google,
  clear,
  small,
  custom,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-md border-pink-500 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${clear ? "bg-rose-500" : "bg-pink-500"} ${outline ? "bg-pink-500" : "bg-pink-500"} ${google ? "border-slate-300 bg-slate-100" : "border-pink-500 bg-pink-500"} ${google ? "text-black" : "text-white"} ${outline ? "border-slate-500" : "border-pink-500"} ${outline ? "text-white" : "text-black"} ${small ? "text-sm font-light" : "text-md font-semibold"} ${small ? "border-1[px] px-2 py-1" : "border-2 px-4 py-3"} ${custom ? custom : ""} `}
    >
      {icon && <Icons.FcGoogle size={24} />} {label}
    </button>
  );
};

export default ButtonLoader;

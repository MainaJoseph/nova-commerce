// ButtonMpesa.tsx
import React from "react";
import * as Icons from "react-icons/fc";

interface ButtonMpesaProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  google?: boolean;
  clear?: boolean;
  small?: boolean;
  custom?: string;
  icon?: React.ElementType; // Use React.ElementType for the icon prop
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonMpesa: React.FC<ButtonMpesaProps> = ({
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
      disabled={disabled} // Use the disabled prop directly
      className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    border-green-600
    flex
    items-center
    justify-center
    gap-2
    ${clear ? "bg-rose-500" : "bg-green-600"}
    ${outline ? "bg-green-600" : "bg-green-600"}
    ${
      google
        ? "bg-slate-100 border-slate-300"
        : "bg-green-600 border-green-600 "
    }
    ${google ? "text-black" : "text-white "}
    ${outline ? "border-slate-500" : "border-green-600"}
    ${outline ? "text-white" : "text-black"}
    ${small ? "text-sm font-light" : "text-md font-semibold"}
    ${small ? "py-1 px-2 border-1[px]" : "py-3 px-4 border-2"}
    ${custom ? custom : ""}
    `}
    >
      {icon && <Icons.FcGoogle size={24} />} {label}
    </button>
  );
};

export default ButtonMpesa;

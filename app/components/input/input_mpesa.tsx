"use client";

import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ChangeEvent, useState } from "react";

interface Input_MpesaProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  label: string;
  type?: string;
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors;
}

const Input_Mpesa = <TFieldValues extends FieldValues>({
  id,
  label,
  type = "text",
  inputMode,
  disabled,
  required,
  register,
  errors,
}: Input_MpesaProps<TFieldValues>) => {
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValidInput = /^[0-9]*$/.test(inputValue); // Check if input consists only of numbers

    if (isValidInput) {
      register(id).onChange({ target: { value: inputValue } }); // Update the form value
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id as string}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        inputMode={
          inputMode as
            | "text"
            | "search"
            | "email"
            | "tel"
            | "url"
            | "none"
            | "numeric"
            | "decimal"
        }
        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md 
          transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${errors[id as string] ? "border-rose-400" : "border-slate-300"}
          ${
            errors[id as string]
              ? "focus:border-rose-400"
              : "focus:border-orange-200"
          }`}
        onChange={handleInputChange} // Attach the event handler
      />
      <label
        htmlFor={id as string}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3
          top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
          ${errors[id as string] ? "text-rose-500" : "text-slate-400"}`}
      >
        {label}
      </label>
      {showWarning && (
        <p className="text-red-500 text-sm  top-full mt-0 left-4 italic">
          Only numbers allowed
        </p>
      )}
    </div>
  );
};

export default Input_Mpesa;

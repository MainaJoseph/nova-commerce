"use client";

import { FcEngineering } from "react-icons/fc";
import Heading from "../components/Heading";

const RegisterForm = () => {
  return (
    <>
      <div className="flex gap-1 items-center">
        <Heading title="Sign Up For Nova" />
        <FcEngineering size={24} className="mt-2" />
      </div>

      <hr
        className="bg-orange-300
      w-full
      h-px"
      />
    </>
  );
};

export default RegisterForm;

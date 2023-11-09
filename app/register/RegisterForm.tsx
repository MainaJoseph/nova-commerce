"use client";

import { FcEngineering } from "react-icons/fc";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

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
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </>
  );
};

export default RegisterForm;

"use client";

import { FcEngineering } from "react-icons/fc";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.replace("/cart");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return (
      <p className="shadow-xs text-center font-semibold shadow-slate-400">
        Logged In. Redirecting...
      </p>
    );
  }

  return (
    <div className="w-full space-y-4">
      {" "}
      {/* Add a container with spacing */}
      <div className="flex items-center justify-center gap-4">
        {" "}
        {/* Add spacing to the heading and icon */}
        <Heading title="Sign In to Nova" />
        <FcEngineering size={24} className="mt-2" />
      </div>
      <Button
        google
        icon={AiOutlineGooglePlus}
        label="Sign In with Google"
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="h-px w-full bg-orange-300" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onsubmit)}
      />
      <p className="text-sm">
        Do Not Have an Acccount?{" "}
        <Link className="text-orange-500 underline" href="/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

//

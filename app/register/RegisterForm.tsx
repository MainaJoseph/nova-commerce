"use client";

import { FcEngineering } from "react-icons/fc";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGooglePlus } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
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

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.replace("/cart");
            router.refresh();
            toast.success("Logged In");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return (
      <p
        className="text-center shadow-xs
      shadow-slate-400 font-semibold"
      >
        Logged In. Redirecting...
      </p>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {" "}
      {/* Add a container with spacing */}
      <div className="flex gap-4 items-center justify-center">
        {" "}
        {/* Add spacing to the heading and icon */}
        <Heading title="Sign Up For Nova" />
        <FcEngineering size={24} className="mt-2" />
      </div>
      <Button
        google
        icon={AiOutlineGooglePlus}
        label="Continue with Google"
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-orange-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        label={isLoading ? "Loading" : "SignUp"}
        onClick={handleSubmit(onsubmit)}
      />
      <p className="text-sm">
        Already Have an Acccount?{" "}
        <Link className="underline text-orange-500" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

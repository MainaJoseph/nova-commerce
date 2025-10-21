"use client";

import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SafeUser } from "@/types";
import { LogIn, Mail, Lock, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Welcome back!", {
          description: "You have successfully logged in.",
        });
        router.replace("/cart");
        router.refresh();
      }
      if (callback?.error) {
        toast.error("Login failed", {
          description: callback.error,
        });
      }
    });
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google");
  };

  if (currentUser) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
          <p className="text-lg font-semibold text-gray-900">
            Logged in successfully
          </p>
          <p className="text-sm text-gray-500">Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="rounded-full bg-orange-100 p-3">
            <Sparkles className="h-6 w-6 text-orange-500" />
          </div>
        </div>
        <h1 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-600">Sign in to your Nova account</p>
      </div>

      <div className="space-y-6">
        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGoogleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <FcGoogle className="h-5 w-5" />
          )}
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full rounded-xl border-2 py-3 pl-11 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full rounded-xl border-2 py-3 pl-11 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-orange-500"
                }`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-orange-600 transition-colors hover:text-orange-700"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

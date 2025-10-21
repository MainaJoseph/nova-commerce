"use client";

import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SafeUser } from "@/types";
import axios from "axios";
import {
  LogIn,
  Mail,
  Lock,
  Loader2,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import EmailVerification from "../register/EmailVerification";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [oauthEmail, setOauthEmail] = useState("");
  const [userId, setUserId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
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
        router.replace("/");
        router.refresh();
      }
      if (callback?.error) {
        // Check if error is about OAuth-only account
        if (
          callback.error.includes("registered with") ||
          callback.error.toLowerCase().includes("google")
        ) {
          setOauthEmail(data.email);
          setShowPasswordPrompt(true);
          toast.info("Add a password to your account", {
            description:
              "Your account uses Google sign-in. Set a password to enable email login.",
          });
        } else {
          toast.error("Login failed", {
            description: callback.error,
          });
        }
      }
    });
  };

  const handleAddPassword: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/add-password", {
        email: oauthEmail,
        password: data.password,
        name: data.name,
      });

      if (response.data.requiresVerification) {
        toast.success("Password added!", {
          description: "Please check your email for the verification code.",
        });
        setUserId(response.data.userId);
        setShowPasswordPrompt(false);
        setShowVerification(true);
      } else {
        toast.success("Password added successfully!", {
          description: "You can now login with email and password.",
        });
        setShowPasswordPrompt(false);
        setValue("email", oauthEmail);
        setValue("password", "");
      }
    } catch (error: any) {
      toast.error("Failed to add password", {
        description: error.response?.data?.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google");
  };

  const handleVerificationBack = () => {
    setShowVerification(false);
    setShowPasswordPrompt(false);
    setValue("password", "");
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

  // Email Verification Screen
  if (showVerification) {
    return (
      <EmailVerification
        email={oauthEmail}
        userId={userId}
        onBack={handleVerificationBack}
      />
    );
  }

  // Password Addition Prompt for OAuth Users
  if (showPasswordPrompt) {
    return (
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="rounded-full bg-blue-100 p-4">
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Add Password to Your Account
          </h1>
          <p className="text-gray-600">
            Your account <span className="font-semibold">{oauthEmail}</span> is
            registered with Google.
            <br />
            Set a password to enable email login.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit(handleAddPassword)} className="space-y-5">
          {/* Name Input (Optional) */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              disabled={isLoading}
              {...register("name")}
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
              placeholder="Your name"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              New Password
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
                placeholder="At least 6 characters"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Adding password...</span>
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                <span>Add Password</span>
              </>
            )}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => {
              setShowPasswordPrompt(false);
              setValue("password", "");
            }}
            disabled={isLoading}
            className="w-full text-sm text-gray-600 transition-colors hover:text-gray-900 disabled:opacity-50"
          >
            ← Back to login
          </button>
        </form>

        {/* Info Box */}
        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Security Notice:</strong>
            <br />
            After adding a password, you&apos;ll receive a verification code via
            email. This ensures your account security.
          </p>
        </div>
      </div>
    );
  }

  // Regular Login Form
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

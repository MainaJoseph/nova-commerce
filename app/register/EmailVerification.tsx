"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { verifyEmailCode } from "@/actions/verifyEmail";
import { resendVerificationCode } from "@/actions/resendVerificationCode";
import { useRouter } from "next/navigation";

interface EmailVerificationProps {
  email: string;
  userId: string;
  onBack: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  userId,
  onBack,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    // Focus last filled input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    document.getElementById(`code-${lastFilledIndex}`)?.focus();
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);

    try {
      const result = await verifyEmailCode(userId, verificationCode);

      if (result.success) {
        setIsVerified(true);
        toast.success("Email verified successfully!", {
          description: "Redirecting to your account...",
        });

        setTimeout(() => {
          router.push("/login");
          router.refresh();
        }, 2000);
      } else {
        toast.error("Verification failed", {
          description: result.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Verification failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      const result = await resendVerificationCode(userId);

      if (result.success) {
        toast.success("Verification code resent!", {
          description: "Check your email for the new code",
        });
        setCode(["", "", "", "", "", ""]);
      } else {
        toast.error("Failed to resend code", {
          description: result.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Failed to resend code", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Email Verified!
          </h2>
          <p className="text-gray-600">
            Your account has been successfully verified.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-full bg-orange-100 p-4">
            <Mail className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Verify Your Email
        </h1>
        <p className="text-gray-600">
          We&apos;ve sent a 6-digit code to
          <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      {/* Code Input */}
      <div className="space-y-6">
        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isVerifying}
              className="h-14 w-12 rounded-xl border-2 border-gray-300 text-center text-2xl font-bold transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:bg-gray-50"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || code.some((d) => !d)}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify Email</span>
          )}
        </button>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-orange-600 transition-colors hover:text-orange-700 disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={isVerifying}
          className="flex w-full items-center justify-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to registration</span>
        </button>
      </div>

      {/* Info */}
      <div className="rounded-xl bg-orange-50 p-4 text-center">
        <p className="text-sm text-orange-800">
          The verification code expires in 10 minutes
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;

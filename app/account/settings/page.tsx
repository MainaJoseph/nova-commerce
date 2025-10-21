"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, Key, Mail } from "lucide-react";
import axios from "axios";

export default function AccountSettings() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/account/set-password", {
        email: session?.user?.email,
        password,
      });

      toast.success("Password set successfully!", {
        description: "You can now login with email and password",
      });

      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error("Failed to set password", {
        description: error.response?.data?.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Account Settings</h1>

      {/* Email Display */}
      <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Set Password */}
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <Key className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">Set Password</h2>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Add a password to enable email/password login in addition to your
          social login.
        </p>

        <form onSubmit={handleSetPassword} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 p-3 focus:border-orange-500 focus:outline-none"
              placeholder="At least 6 characters"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 p-3 focus:border-orange-500 focus:outline-none"
              placeholder="Confirm your password"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Setting password...</span>
              </>
            ) : (
              <span>Set Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

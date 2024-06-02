"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SafeUser } from "@/types";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import UserEmail from "./UserEmail";

interface UpdatedTabProps {
  currentUser: SafeUser | null;
}

const UpdatedTabs: React.FC<UpdatedTabProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setName] = useState(currentUser?.name || "");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle name change event
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    setNameError(newName.length < 3 || !/^[a-zA-Z\s]+$/.test(newName));
  };

  // Handle new password change event
  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    setPasswordError(
      newPassword !== confirmPassword ? "Passwords entered don't match" : ""
    );
  };

  // Handle confirm password change event
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    setPasswordError(
      newPassword !== confirmPassword ? "Passwords entered don't match" : ""
    );
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Toggle Confirm Password Visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    if (name === currentUser?.name) {
      toast.warning("Username is the same");
      return;
    }

    if (nameError || passwordError) {
      toast.error("Please fix the input errors before saving.");
      return;
    }

    setLoading(true);
    try {
      // Check if the last username change was within the last 14 days
      const lastChangeDate = new Date(currentUser?.updatedAt || 0);
      const currentDate = new Date();
      const daysSinceLastChange = Math.ceil(
        (currentDate.getTime() - lastChangeDate.getTime()) / (1000 * 3600 * 24)
      );

      if (daysSinceLastChange < 7) {
        const remainingDays = 7 - daysSinceLastChange;
        toast.warning(
          `You can change your username again in ${remainingDays} days.`
        );
        return;
      }

      // Proceed with username change
      const updatedUser = await fetch("/api/users/updateName", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser?.id,
          name: name,
        }),
      });

      console.log("User updated successfully", updatedUser);
      toast.success("User updated successfully");

      // Reload the page after successful update
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-16">
        {/* Account Tab */}
        <TabsTrigger
          value="account"
          className={`py-2 ${
            activeTab === "account"
              ? "bg-pink-400 text-white"
              : "bg-none border-[1px] border-slate-800 text-slate-800"
          } rounded-md`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </TabsTrigger>
        {/* Password Tab */}
        <TabsTrigger
          value="password"
          className={`py-2 ${
            activeTab === "password"
              ? "bg-pink-400 text-white"
              : "bg-none border-[1px] border-slate-800 text-slate-800"
          } rounded-md`}
          onClick={() => setActiveTab("password")}
        >
          Password
        </TabsTrigger>
      </TabsList>
      {/* Account Tab Content */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you are done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Updated UserName"
                value={name}
                onChange={handleNameChange}
                className={nameError ? "border-red-500" : ""}
              />
              {nameError && (
                <div className="text-red-500 text-sm">
                  Name should be at least 3 letters long and contain only
                  letters.
                </div>
              )}
            </div>
            {/* Email Section */}
            <div className="space-y-1">
              <div>Email</div>
              <div className=" border-[1px] border-slate-400 py-1 rounded-md cursor-not-allowed hover:border-spacing-1 hover:border-sky-300">
                <span>
                  <UserEmail />
                </span>
              </div>
            </div>
          </CardContent>
          {/* Save Changes Button */}
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  className="bg-pink-500 hover:bg-pink-300 text-white transition translate-y-1"
                  disabled={loading || nameError}
                >
                  {loading ? "Loading..." : "Save changes"}
                </Button>
              </AlertDialogTrigger>
              {/* Confirmation Dialog */}
              <AlertDialogContent className="bg-white text-slate-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will not be able to change
                    your username for the next 1 week.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-rose-500 hover:bg-rose-300 text-white transition translate-y-1">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-pink-500 hover:bg-pink-300 text-white transition translate-y-1"
                    onClick={handleSaveChanges}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </TabsContent>
      {/* Password Tab Content */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <div className="relative">
                <Input
                  id="new"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className={passwordError ? "border-red-500" : ""}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={passwordError ? "border-red-500" : ""}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Error Message */}
              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
            </div>
          </CardContent>
          {/* Save Password Button */}
          <CardFooter>
            <Button className="bg-pink-500 hover:bg-pink-300 text-white transition translate-y-1">
              Save password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UpdatedTabs;

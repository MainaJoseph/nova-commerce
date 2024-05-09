"use client";

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
import { useState } from "react";
import { toast } from "react-toastify";

interface UpdatedTabProps {
  currentUser: SafeUser | null;
}

const UpdatedTabs: React.FC<UpdatedTabProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setName] = useState(currentUser?.name || "");
  const [loading, setLoading] = useState(false); // Loading state

  //Fuction to update username
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSaveChanges = async () => {
    if (name === currentUser?.name) {
      // If the updated name is the same as the existing one, toast a warning message
      toast.warning("Username is the same");
      return;
    }

    setLoading(true); // Set loading state to true when API call starts
    try {
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

      // Handle response from API as per your requirement
      console.log("User updated successfully", updatedUser);
      toast.success("User updated successfully");

      // Reload the page after successful update
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    } finally {
      setLoading(false); // Set loading state to false when API call ends
    }
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-16">
        <TabsTrigger
          value="account"
          className={`py-2 ${
            activeTab === "account"
              ? "bg-orange-400 text-white"
              : "bg-none border-[1px] border-slate-800 text-slate-800"
          } rounded-md`}
          onClick={() => setActiveTab("account")} // Set active tab on click
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className={`py-2 ${
            activeTab === "password"
              ? "bg-orange-400 text-white"
              : "bg-none border-[1px] border-slate-800 text-slate-800"
          } rounded-md`}
          onClick={() => setActiveTab("password")} // Set active tab on click
        >
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when youre done.
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
              />
            </div>
            <div className="space-y-1">
              <div>Email</div>
              <div className=" border-[1px] border-slate-400 py-2 rounded-md cursor-not-allowed hover:border-spacing-1 hover:border-sky-300">
                <span className="ml-3 text-slate-500 text-sm">
                  Youremail@gmail.com
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-orange-500 hover:bg-orange-300 text-white transition translate-y-1"
              onClick={handleSaveChanges}
              disabled={loading} // Disable button when loading is true
            >
              {loading ? "Loading..." : "Save changes"}{" "}
              {/* Change button text based on loading state */}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
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
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-orange-500 hover:bg-orange-300 text-white transition translate-y-1">
              Save password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UpdatedTabs;

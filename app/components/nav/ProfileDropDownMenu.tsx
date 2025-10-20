"use client";

import { useCallback, useState } from "react";
import {
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  ChevronDown,
  ShieldCheck,
  Headphones,
  BarChart3,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { SafeUser } from "@/types";
import Avatar from "../Avatar";
import BackDrop from "./BackDrop";

interface ProfileDropDownMenuProps {
  currentUser: SafeUser | null;
}

const ProfileDropDownMenu: React.FC<ProfileDropDownMenuProps> = ({
  currentUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInviteSubmenu, setShowInviteSubmenu] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    setShowInviteSubmenu(false);
  }, []);

  const getFirstName = (name: string | null | undefined) => {
    if (!name) return "";
    const firstName = name.split(" ")[0];
    return firstName;
  };

  // Not logged in state
  if (!currentUser) {
    return (
      <>
        <div className="relative z-30">
          <div
            onClick={toggleOpen}
            className="group flex cursor-pointer items-center gap-2 rounded-full border-[1px] border-orange-400 bg-transparent px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:shadow-md"
          >
            <User className="h-5 w-5 text-orange-500" />
            <span className="hidden sm:inline">Account</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-4 py-3 text-base font-semibold text-gray-900">
                Welcome
              </div>

              <div className="py-2">
                <Link href="/login" onClick={toggleOpen}>
                  <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                    <LogIn className="mr-3 h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Login</span>
                  </div>
                </Link>

                <Link href="/register" onClick={toggleOpen}>
                  <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                    <UserRoundPlus className="mr-3 h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Register</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
        {isOpen && <BackDrop onClick={toggleOpen} />}
      </>
    );
  }

  // Logged in state
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="group flex cursor-pointer items-center gap-2 rounded-full border-[1px] border-orange-400 bg-transparent px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:shadow-md"
        >
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-orange-400">
            <Avatar src={currentUser?.image} />
          </div>
          <span className="hidden sm:inline">
            Hi, {getFirstName(currentUser.name)}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isOpen && (
          <div className="absolute right-0 top-14 max-h-[600px] w-64 overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-4 py-3 text-base font-semibold text-gray-900">
              My Account
            </div>

            {/* Main Menu Items */}
            <div className="py-2">
              <Link href="/account" onClick={toggleOpen}>
                <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                  <User className="mr-3 h-4 w-4 text-orange-600" />
                  <span className="flex-1 text-gray-700">Profile</span>
                  <span className="text-xs text-gray-400">⇧⌘P</span>
                </div>
              </Link>

              <Link href="/orders" onClick={toggleOpen}>
                <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                  <CreditCard className="mr-3 h-4 w-4 text-orange-600" />
                  <span className="flex-1 text-gray-700">Your Orders</span>
                  <span className="text-xs text-gray-400">⌘B</span>
                </div>
              </Link>

              <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                <Settings className="mr-3 h-4 w-4 text-orange-600" />
                <span className="flex-1 text-gray-700">Settings</span>
                <span className="text-xs text-gray-400">⌘S</span>
              </div>

              <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                <Keyboard className="mr-3 h-4 w-4 text-orange-600" />
                <span className="flex-1 text-gray-700">Keyboard shortcuts</span>
                <span className="text-xs text-gray-400">⌘K</span>
              </div>
            </div>

            {/* Admin/Agent specific sections */}
            {(currentUser.role === "ADMIN" || currentUser.role === "AGENT") && (
              <>
                <div className="my-2 border-t border-gray-100"></div>

                <div className="py-2">
                  {currentUser.role === "ADMIN" && (
                    <Link href="/admin" onClick={toggleOpen}>
                      <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                        <ShieldCheck className="mr-3 h-5 w-5 text-orange-600" />
                        <span className="font-medium text-gray-700">
                          Admin Dashboard
                        </span>
                      </div>
                    </Link>
                  )}

                  {(currentUser.role === "ADMIN" ||
                    currentUser.role === "AGENT") && (
                    <Link href="/agent" onClick={toggleOpen}>
                      <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                        <Headphones className="mr-3 h-5 w-5 text-orange-600" />
                        <span className="font-medium text-gray-700">
                          Agent Dashboard
                        </span>
                      </div>
                    </Link>
                  )}

                  {currentUser.role === "ADMIN" && (
                    <Link href="/admin/support" onClick={toggleOpen}>
                      <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                        <BarChart3 className="mr-3 h-5 w-5 text-orange-600" />
                        <span className="font-medium text-gray-700">
                          Chart Admin
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              </>
            )}

            <div className="my-2 border-t border-gray-100"></div>

            {/* Team Section */}
            <div className="py-2">
              <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                <Users className="mr-3 h-4 w-4 text-orange-600" />
                <span className="text-gray-700">Team</span>
              </div>

              <div className="relative">
                <div
                  onClick={() => setShowInviteSubmenu(!showInviteSubmenu)}
                  className="mx-2 flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50"
                >
                  <div className="flex items-center">
                    <UserPlus className="mr-3 h-4 w-4 text-orange-600" />
                    <span className="text-gray-700">Invite users</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showInviteSubmenu ? "rotate-180" : ""}`}
                  />
                </div>

                {showInviteSubmenu && (
                  <div className="ml-4 border-l-2 border-orange-200 pl-4">
                    <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-orange-50">
                      <Mail className="mr-3 h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">Email</span>
                    </div>
                    <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-orange-50">
                      <MessageSquare className="mr-3 h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">Message</span>
                    </div>
                    <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-orange-50">
                      <PlusCircle className="mr-3 h-4 w-4 text-orange-600" />
                      <span className="text-gray-700">More...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                <Plus className="mr-3 h-4 w-4 text-orange-600" />
                <span className="flex-1 text-gray-700">New Team</span>
                <span className="text-xs text-gray-400">⌘+T</span>
              </div>
            </div>

            <div className="my-2 border-t border-gray-100"></div>

            <div className="py-2">
              <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-orange-50">
                <LifeBuoy className="mr-3 h-4 w-4 text-orange-600" />
                <span className="text-gray-700">Support</span>
              </div>
            </div>

            <div className="my-2 border-t border-gray-100"></div>

            <div className="py-2 pb-2">
              <div
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
                className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4 text-red-600" />
                <span className="flex-1 font-medium text-red-600">Logout</span>
                <span className="text-xs text-gray-400">⇧⌘Q</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default ProfileDropDownMenu;

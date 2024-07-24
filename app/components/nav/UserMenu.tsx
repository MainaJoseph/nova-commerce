"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-1 rounded-full border-[1px] border-orange-400 p-2 text-slate-700 transition hover:shadow-md"
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute right-0 top-12 flex w-[170px] cursor-pointer flex-col overflow-hidden rounded-md bg-slate-800 text-sm text-white shadow-md">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                {currentUser.role === "ADMIN" && (
                  <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                )}

                {(currentUser.role === "ADMIN" ||
                  currentUser.role === "AGENT") && (
                  <Link href="/agent">
                    <MenuItem onClick={toggleOpen}>Agent Dashboard</MenuItem>
                  </Link>
                )}

                {currentUser.role === "ADMIN" && (
                  <Link href="/admin/support">
                    <MenuItem onClick={toggleOpen}>Chart Admin</MenuItem>
                  </Link>
                )}

                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  LogOut
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;

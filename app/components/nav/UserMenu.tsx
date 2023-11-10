"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toogleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toogleOpen}
          className="p-2 border-[1px] border-orange-400 flex flex-row items-center gap-1 rounded-full 
        cursor-pointer hover:shadow-md transition text-slate-700"
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12
          text-sm flex flex-col cursor-pointer"
          >
            <div>
              <Link href="/orders">
                <MenuItem onClick={toogleOpen}>Your Orders</MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onClick={toogleOpen}>Admin DashBoard</MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  toogleOpen();
                  signOut();
                }}
              >
                LogOut
              </MenuItem>
            </div>

            <div>
              <Link href="/login">
                <MenuItem onClick={toogleOpen}>Login</MenuItem>
              </Link>
              <Link href="/register">
                <MenuItem onClick={toogleOpen}>Register</MenuItem>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;

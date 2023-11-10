"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";

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
      </div>
    </>
  );
};

export default UserMenu;

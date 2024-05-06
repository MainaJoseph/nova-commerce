"use client";

import { signOut } from "next-auth/react";

const LogoutDropMenu = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default LogoutDropMenu;

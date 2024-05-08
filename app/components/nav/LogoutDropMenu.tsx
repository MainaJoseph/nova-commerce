"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const LogoutDropMenu = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div>
      <button onClick={handleSignOut}>Log out</button>
    </div>
  );
};

export default LogoutDropMenu;

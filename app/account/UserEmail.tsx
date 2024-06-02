"use client";

import { useEffect, useState } from "react";
import { getUserEmail } from "@/actions/getUserEmail";

const UserEmail = () => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getUserEmail();
      setEmail(email);
    };

    fetchEmail();
  }, []);

  return <div className="ml-3 text-slate-500 text-sm">{email}</div>;
};

export default UserEmail;

"use client";

import React, { useState } from "react";
import { MdEmail } from "react-icons/md";

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="text-black mb-5">
      <div className="relative">
        <input
          className="text-slate-800 text-sm pl-10 pr-4 py-2 border rounded focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter E-Mail Address"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <div
          className={`absolute inset-y-0 left-2 flex items-center pr-3 pointer-events-none ${
            isInputFocused ? "text-orange-500" : "text-slate-800"
          }`}
        >
          <MdEmail size={25} />
        </div>
      </div>
    </div>
  );
};

export default EmailInput;

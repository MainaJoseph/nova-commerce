"use client"


import React, { useState } from 'react';

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className=' text-black h-3'>
      <input className='text-slate-600 text-md '
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter Email Address"
      />
    </div>
  );
};

export default EmailInput;

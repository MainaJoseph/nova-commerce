"use client";

import { BiSupport } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const SupportWidget = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <BiSupport
        size={45}
        className="bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-300 focus:outline-none rounded-bl-sm"
      />
    </div>
  );
};

export default SupportWidget;

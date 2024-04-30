"use client";

import { BiSupport } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const SupportWidget = () => {
  return (
    <div>
      <div className="fixed bottom-5 right-5 z-50">
        <Button className="bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-300 focus:outline-none">
          <BiSupport size={35} />
        </Button>
      </div>
    </div>
  );
};

export default SupportWidget;

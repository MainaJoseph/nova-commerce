"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../Container";
import Temp from "./Temp";
import { usePathname } from "next/navigation";
import SheetClient from "../support/SheetClient"; // Import the SheetClient component
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const Frequents: React.FC<UserMenuProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const [showSheetClient, setShowSheetClient] = useState(false); // State to control visibility of SheetClient

  const handleClick = () => {
    setShowSheetClient(true); // Show SheetClient when button is clicked
  };

  // Check if the current route is the homepage
  const isHomePage = pathname === "/";

  // Render the component only if on the homepage
  if (!isHomePage) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between mt-6">
          <div className="flex flex-col gap-3 md:flex md:justify-start md:w-1/2">
            <div className="text-3xl font-bold">Frequently Asked Questions</div>
            <div className="text-md">
              If you have any more questions about Nova, please don’t hesitate
              to contact us.
            </div>
            <div className="mt-2">
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-tl-xl rounded-br-xl hover:opacity-80 transition"
                onClick={handleClick}
              >
                Contact Us
              </button>
            </div>
            <div className="mt-2">
              <Image src="/faq.svg" alt="FAQs" width={500} height={500} />
            </div>
          </div>
          <div className="md:flex md:justify-start md:w-1/2">
            <Temp />
          </div>
        </div>
      </Container>
      {/* Render SheetClient if showSheetClient is true */}
      {showSheetClient && <SheetClient currentUser={currentUser} />}
    </div>
  );
};

export default Frequents;

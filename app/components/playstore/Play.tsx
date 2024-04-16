"use client";

import Image from "next/image";
import Container from "../Container";
import { usePathname } from "next/navigation";
import Template from "./Template";
import ButtonGoogle from "./ButtonGoogle";
import ButtonApple from "./ButtonApple";

const Playstore = () => {
  const pathname = usePathname();

  // Check if the current route is the homepage
  const isHomePage = pathname === "/";

  // Render the component only if on the homepage
  if (!isHomePage) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-400">
      <Container>
        <div className="flex flex-row md:flex-row justify-between mt-6">
          <div className="flex flex-col gap-3 md:flex md:justify-start md:w-1/2">
            <div className="gap-1 text-2xl md:text-4xl lg:text-5xl font-bold mt-2 text-white gap-y-52">
              Unleash the power of Shopping at your{" "}
              <span className="text-orange-500 gap-y-52">fingertips</span>
            </div>
            <div className="flex flex-col gap-4 md:gap-16 md:flex-row md:mt-10">
              <ButtonGoogle />
              <ButtonApple />
            </div>
            <div className="mt-6 md:mt-20 lg:mt-28">
              <div className="text-white text-xl sm:text-md md:text-3xl font-semibold">
                Why Download Our App
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-start md:w-1/2">
            <Template />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Playstore;

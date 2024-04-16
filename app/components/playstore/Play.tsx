"use client";

import Image from "next/image";
import Container from "../Container";
import { usePathname } from "next/navigation";
import Template from "./Template";
import ButtonGoogle from "./ButtonGoogle";
import ButtonApple from "./ButtonApple";
import { useEffect } from "react";

const Playstore = () => {
  const pathname = usePathname();

  // Check if the current route is the homepage
  const isHomePage = pathname === "/";

  // Effect to add event listener for text highlighting
  //   useEffect(() => {
  //     const handleHighlight = () => {
  //       const selection = window.getSelection();
  //       if (selection && selection.toString()) {
  //         const anchorNode = selection.anchorNode;
  //         if (anchorNode && anchorNode.parentElement) {
  //           anchorNode.parentElement.classList.add("highlighted");
  //         }
  //       }
  //     };

  //     document.addEventListener("mouseup", handleHighlight);

  //     return () => {
  //       document.removeEventListener("mouseup", handleHighlight);
  //     };
  //   }, []);

  // Render the component only if on the homepage
  if (!isHomePage) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-400 ">
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
            <div className="mt-6 md:mt-20 lg:mt-28 flex flex-col gap-y-4 lg:gap-y-8">
              <div className="text-white text-xl sm:text-md md:text-3xl font-semibold">
                Why Download Our App
              </div>
              <div className="flex flex-row gap-6 text-white text-md md:text-xl items-center">
                <div className="py-1 px-3 bg-white text-slate-800 font-semibold rounded-md hover:bg-orange-400 hover:text-slate-800">
                  1
                </div>
                <div>Effortless Shopping with just a few Taps</div>
              </div>
              {/* //////////////////////////////////////////////////////////////// */}
              <div className="flex flex-row gap-6 text-white text-md md:text-xl items-center">
                <div className="py-1 px-3 bg-white text-slate-800 font-semibold rounded-md hover:bg-orange-400 hover:text-slate-800">
                  2
                </div>
                <div>Real Time updates with instant notifications</div>
              </div>
              {/* /////////////////////////////////////////////////////////////////// */}
              <div className="flex flex-row gap-6 text-white text-md md:text-xl items-center">
                <div className="py-1 px-3 bg-white text-slate-800 font-semibold rounded-md hover:bg-orange-400 hover:text-slate-800">
                  3
                </div>
                <div>Anywhere anytime access to our services</div>
              </div>
              {/* /////////////////////////////////////////////////////////////////// */}
              <div className="flex flex-row gap-6 text-white text-md md:text-xl items-center">
                <div className="py-1 px-3 bg-white text-slate-800 font-semibold rounded-md hover:bg-orange-400 hover:text-slate-800">
                  4
                </div>
                <div>Exclusive App offers only to our app users</div>
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

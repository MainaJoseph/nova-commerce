"use client";

import Container from "../Container";
import NavyList from "./NavyList";
import { FcEngineering } from "react-icons/fc";
import Link from "next/link";
import { Redressed } from "next/font/google";
import EmailInput from "./EmailInput";
import { usePathname } from "next/navigation";
import ButtonGoogle from "../playstore/ButtonGoogle";
import ButtonApple from "../playstore/ButtonApple";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navy = () => {
  const pathname = usePathname();

  // Check if the current route is  homepage
  const isHomePage = pathname === "/";

  // Render the component only if on NOT on the homepage
  if (isHomePage) {
    return null;
  }
  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white mt-10">
      <Container>
        <div className="flex flex-row sm:justify-between md:justify-evenly pt-4 pb-0 ">
          <div className="hidden md:block">
            <NavyList>
              <Link
                href="/"
                className={`${redressed.className} font-bold text-3xl flex flex-row`}
              >
                Nova
                <span className="mt-2">
                  <FcEngineering size={24} />
                </span>
              </Link>
            </NavyList>
          </div>

          <NavyList>
            <div className="">
              {" "}
              <h3
                className="text-sm font-bold mb-2"
                style={{ fontSize: "12px" }}
              >
                New to Nova?
              </h3>
              <p style={{ fontSize: "11px" }}>Subscribe</p>
              <div className="flex flex-col  gap-2">
                <EmailInput />
                <div className="flex flex-col lg:flex-row gap-2 sm:py-2 ">
                  <button className="border border-white p-2 rounded hover:border-orange-400 hover:text-orange-400 text-sm h-9 w-19 ">
                    MALE
                  </button>
                  <button className="border border-white p-2 rounded hover:border-orange-400 hover:text-orange-400 text-sm h-9 w-19 ">
                    FEMALE
                  </button>
                </div>
              </div>
            </div>
          </NavyList>

          <NavyList>
            <div className="flex flex-row">
              <div className="hidden md:block">
                <Link href="/" className={`${redressed.className}`}>
                  <FcEngineering size={60} />
                </Link>

                <div style={{ textAlign: "center" }}>
                  <p
                    style={{ fontSize: "12px" }}
                    className="whitespace-nowrap mt-1 font-bold"
                  >
                    DOWNLOAD NOVA FREE APP
                  </p>
                  <p style={{ fontSize: "11px" }} className="mt-2">
                    Get access to exclusive offers!
                  </p>
                </div>

                <div className="hidden md:block">
                  <div className="flex flex-col gap-3 mt-3">
                    {/* Google Play Button*/}
                    <ButtonGoogle />

                    {/* Apple Store Button*/}
                    <ButtonApple />
                  </div>
                </div>
              </div>
            </div>
          </NavyList>
        </div>
      </Container>
    </div>
  );
};

export default Navy;

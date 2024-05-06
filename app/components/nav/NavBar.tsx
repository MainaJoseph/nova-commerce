import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import { FcEngineering } from "react-icons/fc";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import CategoriesNav from "./CategoriesNav";
import SearchBar from "../SearchBar";

import ProfileDropDownMenuClient from "./ProfileDropDownMenuClient";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  console.log("User>>>", currentUser);

  const getFirstName = (name: string | null) => {
    // Explicitly define name type as string | null
    if (!name) return ""; // Return empty string if name is null
    // Split the name string and take the first part as the first name
    const firstName = name.split(" ")[0];
    return firstName;
  };

  return (
    <div
      className="
    sticky
    top-0
    w-full
    bg-slate-200
    z-30
    shadow-sm
    "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-3xl flex flex-row`}
            >
              Nova
              <span className="mt-2">
                <FcEngineering size={24} />
              </span>
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-6 md:gap-8">
              <CartCount />
              <ProfileDropDownMenuClient />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <CategoriesNav />
    </div>
  );
};

export default NavBar;

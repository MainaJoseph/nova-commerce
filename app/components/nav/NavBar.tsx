import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import { FcEngineering } from "react-icons/fc";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";

import CategoriesNav from "./CategoriesNav";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  console.log("User>>>", currentUser);

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
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
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

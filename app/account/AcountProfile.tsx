import { SafeUser } from "@/types";
import Container from "../components/Container";
import Avatar from "../components/Avatar";
import AccountName from "./AccountName";
import AccountEmail from "./AccountEmail";
import {
  MdLogout,
  MdManageAccounts,
  MdOutlineBorderColor,
} from "react-icons/md";
import { IoMdWallet } from "react-icons/io";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LogoutDropMenu from "../components/nav/LogoutDropMenu";
import AccountHover from "./AccountHover";
import UpdatedTabs from "./UpdateTabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AccountProfileProps {
  currentUser: SafeUser | null;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ currentUser }) => {
  return (
    <div className="mt-7">
      <Container>
        <div className="flex flex-col md:flex-row justify-items-start gap-6 ">
          <div className="flex flex-col gap-4 md:flex md:justify-start md:w-1/2 ">
            <div className="font-bold text-2xl">My Profile</div>
            <div className="flex flex-col gap-8 shadow-md">
              <AccountHover currentUser={currentUser} />
              {/*//first div in the shadow */}
              <div className="hidden md:flex ml-5 flex-row gap-1 items-center cursor-pointer  text-slate-700 hover:text-orange-400">
                <MdManageAccounts size={30} />
                <div className="text-sm text-center font-semibold">
                  Personal Information
                </div>
              </div>
              <div className="hidden md:flex ml-5 flex-row gap-1 items-center cursor-pointer  text-slate-700 hover:text-orange-400">
                <IoMdWallet size={30} />
                <div className="text-sm text-center font-semibold">
                  My Purchases
                </div>
              </div>
              <div className="hidden  md:flex ml-5 flex-row gap-1 items-center cursor-pointer  text-slate-700 hover:text-orange-400">
                <MdOutlineBorderColor size={27} />
                <div className="text-sm text-center font-semibold">
                  <Link href="/orders">Orders</Link>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex ml-5 flex-row gap-1 items-center cursor-pointer  text-slate-700 hover:text-orange-400 mb-7">
                    <MdLogout size={27} />
                    <div className="text-sm text-center font-semibold">
                      Logout
                    </div>
                  </div>
                </AlertDialogTrigger>
                {/* Confirmation Dialog */}
                <AlertDialogContent className="bg-white text-slate-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logout from Nova. But do not worry you can
                      Login again😊.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-700 hover:bg-slate-500 text-white transition translate-y-1">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-rose-500 hover:bg-rose-300-orange-300 text-white transition translate-y-1">
                      <LogoutDropMenu />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          {/* ////////////////////////////////// */}
          <div className="w-full mb-3  md:mb-[-50px] md:z-10">
            <UpdatedTabs currentUser={currentUser} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountProfile;

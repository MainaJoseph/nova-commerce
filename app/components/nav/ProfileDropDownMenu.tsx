import {
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutDropMenu from "./LogoutDropMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Link from "next/link";
import BackDrop from "./BackDrop";
import { FaAngleDown } from "react-icons/fa";

const ProfileDropDownMenu = async () => {
  const currentUser = await getCurrentUser();

  const getFirstName = (name: string | null) => {
    // Explicitly define name type as string | null
    if (!name) return ""; // Return empty string if name is null
    // Split the name string and take the first part as the first name
    const firstName = name.split(" ")[0];
    return firstName;
  };
  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {currentUser && (
              <div className=" flex flex-row items-center gap-1 font-normal text-slate-800 text-sm cursor-pointer">
                Hi, {getFirstName(currentUser.name)} <FaAngleDown />
                {/* Displaying the greeting with user's first name */}
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-800 text-white ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <Link href="/account">Profile</Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <Link href="/orders">Orders</Link>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-slate-600 cursor-pointer">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-slate-800 text-white">
                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>
                <LogoutDropMenu />
              </span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <BackDrop /> */}
    </>
  );
};

export default ProfileDropDownMenu;

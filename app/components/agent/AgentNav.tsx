"use client";

import Link from "next/link";
import Container from "../Container";
import AgentNavItem from "./AgentNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation";

const AgentNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4 ">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/agent">
            <AgentNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === "/agent"}
            />
          </Link>
          <Link href="/agent/add-products">
            <AgentNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathname === "/agent/add-products"}
            />
          </Link>
          {/* <Link href="/agent/manage-products">
            <AgentNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathname === "/agent/manage-products"}
            />
          </Link> */}
          <Link href="/agent/view-orders">
            <AgentNavItem
              label="View Orders"
              icon={MdFormatListBulleted}
              selected={pathname === "/agent/view-orders"}
            />
          </Link>
          <Link href="/agent/view-users">
            <AgentNavItem
              label="View users"
              icon={FaUsers}
              selected={pathname === "/agent/view-users"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AgentNav;

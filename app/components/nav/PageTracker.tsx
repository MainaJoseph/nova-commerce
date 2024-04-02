"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TiArrowForward } from "react-icons/ti";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";
import { Fragment } from "react";

function PageTracker() {
  const path: string | null = usePathname();
  const pathNames: string[] = path
    ? path.split("/").filter((path) => path)
    : [];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="hover:text-orange-400 font-semibold"
            href="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && (
          <BreadcrumbSeparator>
            <TiArrowForward size={20} className="text-orange-400" />
          </BreadcrumbSeparator>
        )}
        {pathNames.map((link: string, index: number) => {
          const href: string = `/${pathNames.slice(0, index + 1).join("/")}`;
          const linkName: string =
            link[0].toUpperCase() + link.slice(1, link.length);
          const isLastPath: boolean = pathNames.length === index + 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!isLastPath ? (
                  <BreadcrumbLink
                    className="hover:text-orange-400 font-semibold"
                    asChild
                  >
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                ) : (
                  <Breadcrumb>{linkName}</Breadcrumb>
                )}
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && (
                <BreadcrumbSeparator>
                  <TiArrowForward size={20} className="text-orange-400" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default PageTracker;

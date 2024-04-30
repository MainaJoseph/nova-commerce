"use client";

import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SupportWidget = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="fixed bottom-5 right-5 z-50">
            <Button className="bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-300 focus:outline-none">
              <BiSupport size={35} />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-white border-orange-400">
          <SheetHeader>
            <SheetTitle>Chat with Nova</SheetTitle>
            <SheetDescription className="mt-3">
              Welcome to our support! How can we assist you today?
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SupportWidget;

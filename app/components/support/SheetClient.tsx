import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SupportWidget from "./SupportWidget";
import Chat from "./Chat";
import SupportLogin from "./SupportLogin";
import Heading from "../Heading";
import { SafeUser } from "@/types";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface Props {
  currentUser: SafeUser | null; // Update this type definition as per your user data structure
}

const SheetClient = ({ currentUser }: Props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <SupportWidget />
        </SheetTrigger>
        <SheetContent className="bg-white border-slate-800">
          {currentUser ? (
            <SheetHeader>
              <SheetTitle>Chat with Nova</SheetTitle>
              <SheetDescription className="mt-3">
                Welcome to our support! How can we assist you today?
                <Chat />
              </SheetDescription>
            </SheetHeader>
          ) : (
            // Conditional Render
            <div className="p-2 flex flex-col">
              <div>
                <Heading title="Please Login to contact support" />
              </div>
              <div className="mt-20">
                <SupportLogin currentUser={currentUser} />
              </div>
            </div>
          )}
          <SheetFooter className="mt-8 flex-grow items-center justify-center">
            {" "}
            {/* Updated class */}
            <p className="mt-4 hover:text-orange-500 text-center">
              &copy; {new Date().getFullYear()} Nova. All rights reserved
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export async function getServerSideProps() {
  const currentUser = await getCurrentUser();
  return { props: { currentUser } };
}

export default SheetClient;

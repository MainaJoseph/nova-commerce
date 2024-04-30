import SupportWidget from "./SupportWidget";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";

interface Props {
  currentUser: SafeUser | null; // Update this type definition as per your user data structure
}

const Support = ({ currentUser }: Props) => {
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
              </SheetDescription>
            </SheetHeader>
          ) : (
            <div className="p-4">
              <p>Please sign up or log in to access support.</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export async function getServerSideProps() {
  const currentUser = await getCurrentUser();
  return { props: { currentUser } };
}

export default Support;

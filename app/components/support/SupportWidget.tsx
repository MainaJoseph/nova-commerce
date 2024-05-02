import { BiSupport } from "react-icons/bi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getCurrentUser } from "@/actions/getCurrentUser";

const SupportWidget = async () => {
  const currentUser = await getCurrentUser();

  const getFirstName = (name: string | null) => {
    // Explicitly define name type as string | null
    if (!name) return ""; // Return empty string if name is null
    // Split the name string and take the first part as the first name
    const firstName = name.split(" ")[0];
    return firstName;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <HoverCard>
        <HoverCardTrigger>
          <BiSupport
            size={45}
            className="bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-300 focus:outline-none rounded-bl-sm transition"
          />
        </HoverCardTrigger>
        <HoverCardContent className="bg-slate-700 bg-opacity-70 backdrop-blur-md text-white rounded-bl-md rounded-tr-md">
          {currentUser ? (
            <p>
              Hi {getFirstName(currentUser.name)}, click to chat with Nova
              support to address all your issues.
            </p>
          ) : (
            <p>
              Hi there, click to chat with Nova support to address all your
              issues.
            </p>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SupportWidget;

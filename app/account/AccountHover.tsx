import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Avatar from "../components/Avatar";
import { SafeUser } from "@/types";
import AccountName from "./AccountName";
import AccountEmail from "./AccountEmail";
import AccountDateJoined from "./AccountDateJoined";

interface AccountHoverProps {
  currentUser: SafeUser | null;
}

const AccountHover: React.FC<AccountHoverProps> = ({ currentUser }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex flex-row ml-3 gap-2">
          <div className="mt-2">
            <Avatar src={currentUser?.image} />
          </div>
          <div className="flex flex-col gap-0 text-sm mt-2">
            <div className="font-bold">
              <AccountName />
            </div>
            <div>
              <AccountEmail />
            </div>
            <div className=" flex flex-row items-center text-xs mt-4">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground font-semibold">
                <AccountDateJoined />
              </span>
            </div>
          </div>
        </div>{" "}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-slate-800 text-white">
        <div className="gap-1">
          <Avatar src={currentUser?.image} />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              <div className="flex flex-row items-center gap-3">
                <span className="flex flex-row">
                  @<AccountName />
                </span>
                <span className="text-xs">
                  <AccountEmail />
                </span>
              </div>
            </h4>
            <p className="text-sm">
              The Nova Expirience. Shop At your convinince.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                <AccountDateJoined />
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AccountHover;

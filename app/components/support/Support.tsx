import { SafeUser } from "@/types";
import SheetClient from "./SheetClient";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const Support: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <div>
      <SheetClient currentUser={currentUser} />
    </div>
  );
};

export default Support;

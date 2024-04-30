import { SafeUser } from "@/types";
import Support from "./Support";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const SupportClient: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <div>
      <Support currentUser={currentUser} />
    </div>
  );
};

export default SupportClient;

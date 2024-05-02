import { SafeUser } from "@/types";
import Support from "./Support";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const SupportClient: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-400">
      <Support currentUser={currentUser} />
    </div>
  );
};

export default SupportClient;

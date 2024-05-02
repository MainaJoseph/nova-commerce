import { SafeUser } from "@/types";
import Support from "./Support";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const SupportClient: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <div className="bg-slate-700">
      <Support currentUser={currentUser} />
    </div>
  );
};

export default SupportClient;

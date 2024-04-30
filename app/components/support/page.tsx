import { getCurrentUser } from "@/actions/getCurrentUser";
import SupportWidget from "./SupportWidget";

const Support = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <SupportWidget />
    </div>
  );
};

export default Support;

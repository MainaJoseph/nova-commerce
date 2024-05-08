export const metadata = {
  title: "Acount Profile",
  description: "Check you account details here",
};

import { getCurrentUser } from "@/actions/getCurrentUser";

import NullData from "../components/NullData";
import AccountProfile from "./AcountProfile";

const Account = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Opps! Access Denied" />;
  }
  return (
    <div>
      <AccountProfile currentUser={currentUser} />
    </div>
  );
};

export default Account;

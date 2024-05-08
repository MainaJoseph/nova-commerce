import { getCurrentUser } from "@/actions/getCurrentUser";

const AccountName = async () => {
  const currentUser = await getCurrentUser();

  const getFullName = (name: string | null) => {
    if (!name) return ""; // Return empty string if name is null
    return name; // Return the entire name
  };

  return (
    <div>{currentUser && <div>{getFullName(currentUser.name)} </div>}</div>
  );
};

export default AccountName;

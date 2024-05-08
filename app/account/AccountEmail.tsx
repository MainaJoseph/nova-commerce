import { getCurrentUser } from "@/actions/getCurrentUser";

const AccountEmail = async () => {
  const currentUser = await getCurrentUser();

  const getEmail = (email: string | null) => {
    if (!email) return ""; // Return empty string if email is null
    return email; // Return the entire email
  };

  return <div>{currentUser && <div>{getEmail(currentUser.email)}</div>}</div>;
};

export default AccountEmail;

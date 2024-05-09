import { getCurrentUser } from "@/actions/getCurrentUser";

const AccountDateJoined = async () => {
  const currentUser = await getCurrentUser();

  const getJoinDate = (date: string | null) => {
    if (!date) return ""; // Return empty string if date is null

    // Parse the date string
    const joinDate = new Date(date);

    // Format the date as "Month Year"
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(joinDate);

    return formattedDate; // Return the formatted join date
  };

  return (
    <div>
      {currentUser && (
        <div>
          <div>Joined on: {getJoinDate(currentUser.createdAt)}</div>
        </div>
      )}
    </div>
  );
};

export default AccountDateJoined;

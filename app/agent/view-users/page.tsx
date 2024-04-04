import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getUsers from "@/actions/getUsers";
import ViewUsersClient from "./ViewUsersClient";

const ViewUsers = async () => {
  const users = await getUsers();

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ViewUsersClient users={users} />
      </Container>
    </div>
  );
};

export default ViewUsers;

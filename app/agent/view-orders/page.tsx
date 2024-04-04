import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrder";
import ViewOrdersClient from "./ViewOrdersClient";

const ManageOrders = async () => {
  const orders = await getOrders();

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ViewOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;

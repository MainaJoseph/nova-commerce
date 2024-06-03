import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import PurchaseClient from "./PurchaseClient";

const Purchases = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Opps! Access Denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No Purchases Yet..." />;
  }
  return (
    <div>
      <PurchaseClient
        orders={orders.filter(
          (order) =>
            order.status === "complete" && order.deliveryStatus === "delivered"
        )}
      />
    </div>
  );
};

export default Purchases;

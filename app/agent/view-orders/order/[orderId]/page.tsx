import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  orderId?: string; // Changed property name to match the one used in getOrderById
}

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);
  const currentUser = await getCurrentUser();

  if (!order) return <NullData title="No order"></NullData>;

  if (
    !currentUser ||
    (currentUser.role !== "ADMIN" && currentUser.role !== "AGENT")
  ) {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;

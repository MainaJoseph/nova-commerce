import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeliveredOrdersClient from "./DeliveredOrdersClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Opps! Access Denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="p-8">
      <Container>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="flex space-x-4">
            <TabsTrigger
              value="pending"
              className="px-4 py-3 rounded-md data-[state=active]:bg-orange-500 data-[state=active]:text-white bg-gray-200 text-gray-700"
            >
              Pending Orders
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className="px-4 py-3 rounded-md data-[state=active]:bg-orange-500 data-[state=active]:text-white bg-gray-200 text-gray-700"
            >
              Completed Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <OrdersClient
              orders={orders.filter(
                (order) =>
                  (order.status === "pending" || order.status === "complete") &&
                  (order.deliveryStatus === "pending" ||
                    order.deliveryStatus === "dispatched")
              )}
            />
          </TabsContent>
          <TabsContent value="complete">
            <DeliveredOrdersClient
              orders={orders.filter(
                (order) =>
                  order.status === "complete" &&
                  order.deliveryStatus === "delivered"
              )}
            />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default Orders;

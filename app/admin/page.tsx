import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrder";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} users={users} orders={orders} />
      </Container>
    </div>
  );
};

export default Admin;

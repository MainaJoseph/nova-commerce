import getProducts from "@/actions/getProducts";
// import Summary from "./Summary";
import getOrders from "@/actions/getOrder";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";

const Admin = async () => {
  // const products = await getProducts({ category: null });
  // const orders = await getOrders();
  // const users = await getUsers();

  return (
    <div className="pt-8">
      <Container>
        {/* <Summary products={products} users={users} orders={orders} /> */}
        <div>page</div>
      </Container>
    </div>
  );
};

export default Admin;

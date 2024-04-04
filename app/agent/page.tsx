import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrder";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  const currentUser = await getCurrentUser();
  if (
    !currentUser ||
    (currentUser.role !== "ADMIN" && currentUser.role !== "AGENT")
  ) {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <div className="mt-4 mx-auto max-w-[1150px]"></div>
      </Container>
    </div>
  );
};

export default Admin;

import Container from "@/app/components/Container";
import ViewProductsClient from "./ViewProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });

  const currentUser = await getCurrentUser();

  if (
    !currentUser ||
    (currentUser.role !== "ADMIN" && currentUser.role !== "AGENT")
  ) {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ViewProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;

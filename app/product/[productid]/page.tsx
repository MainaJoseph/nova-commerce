import React from "react";
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import SimilarProducts from "./SimilarProducts";
import getProductById from "@/actions/getProductById";
import getProducts from "@/actions/getProducts";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productid?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  // Fetch all products for similar products section
  const allProducts = (await getProducts({})) || [];

  if (!product)
    return <NullData title="Opps.. Product with given Id does not exist" />;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 p-8">
      <Container>
        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Similar Products Section */}
        {allProducts.length > 0 && (
          <div className="mt-20">
            <SimilarProducts
              currentProduct={product}
              allProducts={allProducts}
            />
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-20 flex flex-col gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;

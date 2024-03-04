import React from "react";
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IParams {
  productid?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);

  if (!product)
    return <NullData title="Opps.. Product with given Id does not exist" />;

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;

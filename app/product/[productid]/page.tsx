import React from "react";
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails"; // Corrected the import statement
import { singleProduct } from "@/utils/singleProduct";
import ListRating from "./ListRating";

interface IParams {
  productid?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const product = singleProduct; // Use the imported singleProduct
  console.log("params", params);

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

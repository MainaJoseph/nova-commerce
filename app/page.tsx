import React from "react";
import Container from "./components/Container";
import Carousel from "./components/banners/Carousel";
import { products } from "@/utils/product";
import { TruncateText } from "@/utils/TruncateText";
import ProductCard from "./components/products/ProductCards";
import Slider from "./components/banners/Carousel";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <Slider />
      </Container>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-6 gap-8">
        {products.map((product: any) => {
          return <ProductCard data={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}

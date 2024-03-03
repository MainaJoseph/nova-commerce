import React from "react";
import Container from "./components/Container";
import Carousel from "./components/banners/Carousel";
import { products } from "@/utils/product";
import { TruncateText } from "@/utils/TruncateText";
import ProductCard from "./components/products/ProductCards";
import Slider from "./components/banners/Carousel";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops! No product found. Click All to clear all filters" />
    );
  }

  // Fisher-yates shuffle algorithm

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], (array[j] = array[j]), array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <Slider />
      </Container>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-6 gap-8">
        {shuffledProducts.map((product: any) => {
          return <ProductCard data={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}

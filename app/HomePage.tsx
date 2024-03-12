import Container from "./components/Container";
import ProductCard from "./components/products/ProductCards";
import Slider from "./components/banners/Carousel";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";
import RemoveFilters from "./components/nav/RemoveFilters";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <NullData title="Oops! No product found. Click Remove to clear all filters" />
        <RemoveFilters />
      </div>
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

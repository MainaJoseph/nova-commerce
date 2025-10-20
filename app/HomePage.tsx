import getProducts, { IProductParams } from "@/actions/getProducts";
import HomePageClient from "./HomePageClient";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  const hasFilters = Object.keys(searchParams).length > 0;

  return <HomePageClient products={products} hasFilters={hasFilters} />;
}

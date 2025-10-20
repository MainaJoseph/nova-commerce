"use client";

import { useState } from "react";
import Container from "./components/Container";
import ProductCard from "./components/products/ProductCards";
import Slider from "./components/banners/Carousel";
import NullData from "./components/NullData";
import RemoveFilters from "./components/nav/RemoveFilters";
import { ChevronRight, Package, Sparkles } from "lucide-react";

interface Product {
  id: string;
  category: string;
  [key: string]: any;
}

interface HomePageClientProps {
  products: Product[];
  hasFilters: boolean;
}

const PRODUCTS_PER_LOAD = 15;

export default function HomePageClient({
  products,
  hasFilters,
}: HomePageClientProps) {
  // Group products by category
  const productsByCategory = products.reduce(
    (acc: { [key: string]: Product[] }, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {},
  );

  // State to track how many products to show per category
  const [visibleCount, setVisibleCount] = useState<{ [key: string]: number }>(
    Object.keys(productsByCategory).reduce(
      (acc, category) => {
        acc[category] = PRODUCTS_PER_LOAD;
        return acc;
      },
      {} as { [key: string]: number },
    ),
  );

  const handleShowMore = (category: string) => {
    setVisibleCount((prev) => ({
      ...prev,
      [category]: prev[category] + PRODUCTS_PER_LOAD,
    }));
  };

  const handleShowLess = (category: string) => {
    setVisibleCount((prev) => ({
      ...prev,
      [category]: PRODUCTS_PER_LOAD,
    }));
  };

  if (products.length === 0) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-4 px-4">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200">
          <Package className="h-12 w-12 text-orange-500" />
        </div>
        <NullData title="Oops! No product found. Click Remove to clear all filters" />
        <RemoveFilters />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pb-16">
      <Container>
        <Slider />
      </Container>

      <Container>
        <div className="mt-16 space-y-20">
          {Object.entries(productsByCategory).map(
            ([category, categoryProducts], index) => {
              const visibleProducts = categoryProducts.slice(
                0,
                visibleCount[category],
              );
              const hasMore = categoryProducts.length > visibleCount[category];
              const isExpanded = visibleCount[category] > PRODUCTS_PER_LOAD;

              return (
                <div key={category} className="space-y-8">
                  {/* Category Header */}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent">
                            {category}
                          </h2>
                          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                            {categoryProducts.length}{" "}
                            {categoryProducts.length === 1
                              ? "product"
                              : "products"}{" "}
                            available
                          </p>
                        </div>
                      </div>

                      {!hasFilters &&
                        categoryProducts.length > PRODUCTS_PER_LOAD && (
                          <button className="group flex items-center gap-2 rounded-full border-2 border-orange-400 bg-white px-6 py-3 text-sm font-semibold text-orange-600 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md">
                            <span>View All {category}</span>
                            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        )}
                    </div>

                    {/* Decorative line */}
                    <div className="absolute -bottom-4 left-0 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </div>

                  {/* Product Grid with fade-in animation */}
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {visibleProducts.map((product, idx) => (
                      <div
                        key={product.id}
                        className="animate-in fade-in slide-in-from-bottom-4"
                        style={{
                          animationDelay: `${idx * 50}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        <ProductCard data={product} />
                      </div>
                    ))}
                  </div>

                  {/* Show More/Less Button */}
                  {(hasMore || isExpanded) && (
                    <div className="flex justify-center pt-8">
                      {hasMore ? (
                        <button
                          onClick={() => handleShowMore(category)}
                          className="group relative transform overflow-hidden rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-10 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                          <span className="relative flex items-center gap-2">
                            Load More Products
                            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleShowLess(category)}
                          className="group transform rounded-full border-2 border-gray-300 bg-white px-10 py-4 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:shadow-md"
                        >
                          <span className="flex items-center gap-2">
                            Show Less
                            <ChevronRight className="h-5 w-5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                          </span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Divider between categories */}
                  {index < Object.entries(productsByCategory).length - 1 && (
                    <div className="pt-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                  )}
                </div>
              );
            },
          )}
        </div>
      </Container>
    </div>
  );
}

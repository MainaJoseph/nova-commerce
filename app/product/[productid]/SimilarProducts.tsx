"use client";

import React, { useState } from "react";
import ProductCard from "@/app/components/products/ProductCards";
import { ChevronLeft, ChevronRight, Sparkles, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  [key: string]: any;
}

interface SimilarProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProduct,
  allProducts,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filter similar products by brand first, then category, then price range
  const similarProducts = allProducts
    .filter((product) => product.id !== currentProduct.id) // Exclude current product
    .filter((product) => {
      // Prioritize same brand
      if (product.brand === currentProduct.brand) return true;
      // Then same category
      if (product.category === currentProduct.category) return true;
      return false;
    })
    .map((product) => {
      // Calculate similarity score
      let score = 0;

      // Brand match: +100 points
      if (product.brand === currentProduct.brand) {
        score += 100;
      }

      // Category match: +50 points
      if (product.category === currentProduct.category) {
        score += 50;
      }

      // Price similarity: +0 to +30 points based on how close the price is
      const currentPrice = currentProduct.discount
        ? currentProduct.price * (1 - currentProduct.discount / 100)
        : currentProduct.price;

      const productPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

      const priceDifference = Math.abs(currentPrice - productPrice);
      const pricePercentDiff = (priceDifference / currentPrice) * 100;

      // Price within 10% = +30 points, 10-25% = +20 points, 25-50% = +10 points
      if (pricePercentDiff <= 10) {
        score += 30;
      } else if (pricePercentDiff <= 25) {
        score += 20;
      } else if (pricePercentDiff <= 50) {
        score += 10;
      }

      return { ...product, similarityScore: score };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by highest score
    .slice(0, 12); // Limit to 12 products

  if (similarProducts.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    const container = document.getElementById("similar-products-scroll");
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("similar-products-scroll");
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Similar Products
            </h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
              From {currentProduct.brand} and related items
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute -bottom-4 left-0 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-transparent"></div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Scroll Buttons */}
        {similarProducts.length > 4 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-orange-50 hover:shadow-xl lg:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-orange-600" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-orange-50 hover:shadow-xl lg:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-orange-600" />
            </button>
          </>
        )}

        {/* Scrollable Container */}
        <div
          id="similar-products-scroll"
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {similarProducts.map((product, idx) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-4 min-w-[200px] flex-shrink-0 sm:min-w-[240px]"
              style={{
                animationDelay: `${idx * 50}ms`,
                animationFillMode: "backwards",
              }}
            >
              <ProductCard data={product} />
            </div>
          ))}
        </div>

        {/* Fade overlay for scroll indication */}
        {similarProducts.length > 4 && (
          <>
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-8 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l from-white to-transparent"></div>
          </>
        )}
      </div>

      {/* Mobile scroll hint */}
      {similarProducts.length > 2 && (
        <div className="flex justify-center lg:hidden">
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <ChevronLeft className="h-4 w-4" />
            Swipe to see more
            <ChevronRight className="h-4 w-4" />
          </p>
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;

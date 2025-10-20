"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Rating } from "@mui/material";
import ProductImage from "@/app/components/products/ProductImage";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";
import {
  Star,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Tag,
  Shield,
} from "lucide-react";

export interface SelectedImgType {
  color: string;
  colorCode: string;
  image: string;
}

export interface CartProductType {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
}

interface ProductDetailsProps {
  product: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: discountedPrice,
  });

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id,
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const productRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, item: any) => item.rating + acc,
          0,
        ) / product.reviews.length
      : 0;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 25) {
      return toast.error("OPPS Maximum reached");
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return toast.error("OPPS Minimum reached");
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid gap-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 p-6 sm:grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:p-8">
      {/* Product Images with Cart Actions */}
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
        handleQtyIncrease={handleQtyIncrease}
        handleQtyDecrease={handleQtyDecrease}
        handleAddProductToCart={handleAddProductToCart}
        isProductInCart={isProductInCart}
      />

      {/* Product Info */}
      <div className="flex flex-col gap-6">
        {/* Product Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
            {product.name}
          </h1>

          {/* Rating and Reviews */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2">
              <Rating value={productRating} readOnly size="small" />
              <span className="font-semibold text-gray-700">
                {productRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
              <span className="text-sm">{product.reviews.length} Reviews</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 p-6">
          {product.discount ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  Ksh {discountedPrice.toFixed(2)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                  <TrendingUp className="h-4 w-4" />
                  {product.discount}% OFF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-500 line-through">
                  Ksh {product.price}
                </span>
                <span className="text-sm font-medium text-green-600">
                  Save Ksh {(product.price - discountedPrice).toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Ksh {product.price}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-3">
          {product.inStock ? (
            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-green-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">In Stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-700">
              <XCircle className="h-5 w-5" />
              <span className="font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-gradient-to-b from-orange-400 to-orange-600"></div>
            Key Features
          </h3>
          <ul className="space-y-4">
            {product.description
              .split(/\n|•/)
              .filter((point: string) => point.trim() && point.length > 5)
              .map((point: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-orange-50"
                >
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></div>
                  <span className="flex-1 text-sm leading-relaxed text-gray-700 md:text-base">
                    {point.trim()}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <Tag className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">Category</span>
            </div>
            <p className="font-semibold text-gray-900">{product.category}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">Brand</span>
            </div>
            <p className="font-semibold text-gray-900">{product.brand}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productid]/ProductDetails";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/SetQuantity";
import { ShoppingCart, Package, CheckCircle2 } from "lucide-react";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
  handleAddProductToCart: (product: CartProductType) => void;
  isProductInCart: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
  handleQtyIncrease,
  handleQtyDecrease,
  handleAddProductToCart,
  isProductInCart,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      {/* Image Gallery */}
      <div className="grid h-full max-h-[500px] min-h-[300px] grid-cols-6 gap-2 sm:min-h-[400px]">
        <div className="flex h-full max-h-[500px] min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 border sm:min-h-[400px]">
          {product.images.map((image: SelectedImgType) => {
            return (
              <div
                key={image.color}
                onClick={() => {
                  handleColorSelect(image);
                }}
                className={`relative aspect-square w-[80%] rounded border-teal-300 ${
                  cartProduct.selectedImg.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                }`}
              >
                <Image
                  src={image.image}
                  alt={image.color}
                  width={1000}
                  height={1000}
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
        <div className="relative col-span-5 aspect-square">
          <Image
            src={cartProduct.selectedImg.image}
            alt={cartProduct.name}
            width={500}
            height={500}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Cart Actions Section */}
      {isProductInCart ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
            <span className="font-semibold text-green-700">
              Product Added To Cart
            </span>
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
          >
            <ShoppingCart className="h-5 w-5" />
            View Cart
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Color
            </h3>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
          </div>

          {/* Quantity Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
          </div>

          {/* Add to Cart Button */}
          {product.inStock ? (
            <button
              onClick={() => handleAddProductToCart(cartProduct)}
              className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
            >
              <ShoppingCart className="h-5 w-5" />
              Add To Cart
            </button>
          ) : (
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-300 px-6 py-4 font-bold text-gray-500"
            >
              <Package className="h-5 w-5" />
              Out of Stock
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImage;

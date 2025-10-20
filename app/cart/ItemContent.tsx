"use client";

import React from "react";
import { CartProductType } from "../product/[productid]/ProductDetails";
import { FormatPrice } from "@/utils/FormatPrice";
import Link from "next/link";
import { TruncateText } from "@/utils/TruncateText";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus } from "lucide-react";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  return (
    <div className="group relative overflow-visible rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center md:gap-6">
        {/* Product Image & Info */}
        <div className="col-span-1 md:col-span-5">
          <div className="flex gap-3 md:gap-4">
            <Link href={`/product/${item.id}`} className="flex-shrink-0">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-transform duration-300 hover:scale-105 md:h-24 md:w-24">
                <Image
                  src={item.selectedImg.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </Link>

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/product/${item.id}`}
                  className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-orange-600 md:text-lg"
                >
                  {item.name}
                </Link>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500 md:text-sm">
                    Color:
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-300 md:h-5 md:w-5"
                      style={{ backgroundColor: item.selectedImg.colorCode }}
                    ></div>
                    <span className="truncate text-xs font-medium capitalize text-gray-700 md:text-sm">
                      {item.selectedImg.color}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemoveProductFromCart(item)}
                className="mt-2 flex items-center gap-2 text-xs font-medium text-red-500 transition-colors hover:text-red-600 md:hidden md:text-sm"
              >
                <Trash2 className="h-4 w-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-1 flex items-center justify-between border-t border-gray-100 pt-3 md:col-span-2 md:justify-center md:border-t-0 md:pt-0">
          <span className="text-sm font-medium text-gray-500 md:hidden">
            Price:
          </span>
          <span className="whitespace-nowrap text-base font-semibold text-gray-900 md:text-lg">
            {FormatPrice(item.price)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="col-span-1 flex items-center justify-between md:col-span-3 md:justify-center">
          <span className="text-sm font-medium text-gray-500 md:hidden">
            Quantity:
          </span>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => handleCartQtyDecrease(item)}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 transition-all hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 flex-shrink-0 text-center text-base font-semibold text-gray-900 md:text-lg">
              {item.quantity}
            </span>
            <button
              onClick={() => handleCartQtyIncrease(item)}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 transition-all hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Total & Remove */}
        <div className="col-span-1 flex items-center justify-between border-t border-gray-100 pt-3 md:col-span-2 md:flex-col md:items-end md:border-t-0 md:pt-0">
          <div className="flex flex-col items-start md:items-end">
            <span className="text-sm font-medium text-gray-500 md:hidden">
              Total:
            </span>
            <span className="whitespace-nowrap text-lg font-bold text-orange-600 md:text-xl">
              {FormatPrice(item.price * item.quantity)}
            </span>
          </div>

          <button
            onClick={() => handleRemoveProductFromCart(item)}
            className="hidden flex-shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 md:flex"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemContent;

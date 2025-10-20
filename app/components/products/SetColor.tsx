"use client";

import React from "react";
import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productid]/ProductDetails";
import { Check } from "lucide-react";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4">
        {images.map((image) => {
          const isSelected = cartProduct.selectedImg.color === image.color;

          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              {/* Color Circle */}
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                  isSelected
                    ? "scale-110 ring-1 ring-orange-400 ring-offset-1"
                    : "ring-1 ring-gray-200 hover:scale-105 hover:ring-orange-300"
                } `}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-10 w-10 rounded-full shadow-md transition-transform duration-300 group-hover:scale-95"
                ></div>

                {/* Check Icon for Selected Color */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white p-0.5 shadow-lg">
                      <Check className="h-4 w-4 stroke-[3] text-orange-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Color Name */}
              <span
                className={`text-xs font-medium capitalize transition-colors duration-300 ${
                  isSelected
                    ? "font-semibold text-orange-600"
                    : "text-gray-600 group-hover:text-gray-900"
                } `}
              >
                {image.color}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Color Display */}
      <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5">
        <div
          style={{ background: cartProduct.selectedImg.colorCode }}
          className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
        ></div>
        <span className="text-sm text-gray-700">
          Selected:{" "}
          <span className="font-semibold capitalize text-gray-900">
            {cartProduct.selectedImg.color}
          </span>
        </span>
      </div>
    </div>
  );
};

export default SetColor;

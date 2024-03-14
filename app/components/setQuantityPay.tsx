"use client";

import React from "react";
import { CartProductType } from "@/app/product/[productid]/ProductDetails";

interface SetQuantityPayProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantityPay: React.FC<SetQuantityPayProps> = ({
  cartCounter,
  cartProduct,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex gap-4 items-center text-base">
        <div>{cartProduct.quantity}</div>
      </div>
    </div>
  );
};

export default SetQuantityPay;

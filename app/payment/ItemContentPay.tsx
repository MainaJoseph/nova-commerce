"use client";

import React from "react";
import { CartProductType } from "../product/[productid]/ProductDetails";
import { FormatPrice } from "@/utils/FormatPrice";
import Link from "next/link";
import { TruncateText } from "@/utils/TruncateText";
import Image from "next/image";
import SetQuantityPay from "../components/setQuantityPay";

interface ItemContentPayProps {
  item: CartProductType;
}

const ItemContentPay: React.FC<ItemContentPayProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-300 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{TruncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px] "></div>
        </div>
      </div>
      <div className="justify-self-center font-semibold">
        {FormatPrice(item.price)}
      </div>
      <div className="justify-self-center font-semibold">
        <SetQuantityPay cartCounter={true} cartProduct={item} />
      </div>
      <div className="justify-self-end font-semibold text-md">
        {FormatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContentPay;

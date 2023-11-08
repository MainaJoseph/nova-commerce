"use client";

import React from "react";
import { CartProductType } from "../product/[productid]/ProductDetails";
import { FormatPrice } from "@/utils/FormatPrice";
import Link from "next/link";
import { TruncateText } from "@/utils/TruncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { AiOutlineDelete } from "react-icons/ai";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveProductFromCart } = useCart();
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
          <div className="w-[70px] ">
            <button
              className=" underline mt-2 hover:bg-orange-300 rounded-md text-orange-500"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              <span className="flex gap-1">
                <AiOutlineDelete size={20} /> Remove
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{FormatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {}}
          handleQtyDecrease={() => {}}
        />
      </div>
      <div className="justify-self-end font-semibold0">
        {FormatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;

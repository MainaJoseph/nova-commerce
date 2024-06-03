"use client";

import { FormatPrice } from "@/utils/FormatPrice";
import { TruncateText } from "@/utils/TruncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1/5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flax gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            className="object-contain"
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{TruncateText(item.name)}</div>
          <div
            className="font-semibold"
            style={{ color: item.selectedImg.color }}
          >
            {item.selectedImg.color}
          </div>
        </div>
      </div>
      <div className="justify-self-center">{FormatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        {(item.quantity * item.price).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;

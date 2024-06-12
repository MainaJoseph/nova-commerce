"use client";

import { FormatPrice } from "@/utils/FormatPrice";
import { TruncateText } from "@/utils/TruncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  const discountedPrice = data.discount
    ? data.price * (1 - data.discount / 100)
    : data.price;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 mt-12 cursor-pointer rounded-sm border-[1.2px] border-slate-200 bg-slate-50 p-2 text-center text-sm transition hover:scale-105"
    >
      <div className="flex w-full flex-col items-center gap-1">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            className="h-full w-full object-contain"
            src={data.images[0].image}
            alt={data.name}
            width={200}
            height={200}
          />
        </div>
        <div className="mt-4">{TruncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        {data.discount ? (
          <div>
            <div className="text-rose-500 line-through">
              {FormatPrice(data.price)}
            </div>
            <div className="font-semibold text-black">
              {FormatPrice(discountedPrice)}
            </div>
            <div className="text-green-500">({data.discount}% off)</div>
          </div>
        ) : (
          <div className="font-semibold">{FormatPrice(data.price)}</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

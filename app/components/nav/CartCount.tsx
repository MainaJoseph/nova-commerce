"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { BsCart4 } from "react-icons/bs";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div
      className="flex gap-3 font-bold items-center"
      onClick={() => router.push("/cart")}
    >
      <div className="relative cursor-pointer">
        <div className="text-3xl">
          <BsCart4 />
        </div>
        <span
          className="absolute top-[-10px] right-[-10px] bg-orange-500 text-white h-6 w-6 rounded-full
      flex items-center justify-center text-sm"
        >
          {cartTotalQty}
        </span>
      </div>
      <span className="cursor-pointer hover:text-orange-500">Cart</span>
    </div>
  );
};

export default CartCount;

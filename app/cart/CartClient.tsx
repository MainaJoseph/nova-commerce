"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const CartClient = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart is Empty</div>
        <div>
          <Link
            href={"/"}
            className="text-orange-500 flex items-center gap-1mt-2"
          >
            <MdArrowBack size={40} />
            <span className="text-slate-500">Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default CartClient;

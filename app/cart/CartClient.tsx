"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";

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

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-300 py-4 flex justify-between gap-4">
        <div className="w-[90px] ">
          <Button label="Clear Cart" onClick={() => {}} small clear />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full texxt-base font-semibold">
            <span>Subtotals</span>
            <span>Ksh 4000</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shipping Calculated at checkout
          </p>
          <Button label="Check Out" onClick={() => {}} />
          <Link
            href={"/"}
            className="text-orange-500 flex items-center gap-1mt-2"
          >
            <MdArrowBack size={40} />
            <span className="text-slate-500">Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;

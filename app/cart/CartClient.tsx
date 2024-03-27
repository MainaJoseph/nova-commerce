"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdRemoveShoppingCart } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { FormatPrice } from "@/utils/FormatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="border rounded-full bg-slate-200 text-slate-600 p-3">
          <MdRemoveShoppingCart size={90} />
        </div>
        <div className="text-2xl mt-3 font-semibold">Your Cart is Empty!</div>
        <p className="text-slate-400 text-md font-normal mt-4">
          Browse our categories and discover our best deals!
        </p>
        <div className="border bg-orange-500 px-3 py-2 rounded-md hover:bg-orange-300 mt-5">
          <Link href={"/"} className="text-white flex items-center gap-1mt-2">
            <MdArrowBack size={30} />
            <span className="text-white">Start Shopping</span>
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
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            clear
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full texxt-base mt-8 gap-1">
            <span>Subtotals:</span>
            <span className="font-semibold">
              {FormatPrice(cartTotalAmount)}
            </span>
          </div>

          <Button
            label={currentUser ? "Proceed to Pay" : "Login To Checkout"}
            onClick={() => {
              currentUser ? router.push("/payment") : router.push("/login");
            }}
            google={currentUser ? false : true}
          />
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

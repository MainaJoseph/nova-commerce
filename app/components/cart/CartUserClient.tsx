"use client";

// CartUserClient component

import { FormatPrice } from "@/utils/FormatPrice";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdRemoveShoppingCart } from "react-icons/md";
import Button from "../Button";
import Heading from "../Heading";
import ItemContent from "@/app/cart/ItemContent";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation"; // Move the import here

interface CartUserClientProps {
  currentUser: SafeUser | null;
  onClose: () => void;
}

const CartUserClient: React.FC<CartUserClientProps> = ({
  currentUser,
  onClose,
}) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter(); // Move the useRouter hook here

  const handleProceed = () => {
    onClose(); // Close the modal first
    setTimeout(() => {
      if (currentUser) {
        router.push("/payment");
      } else {
        router.push("/login");
      }
    }, 300); // Add a slight delay to ensure modal closes before navigating
  };

  const handleEmpty = () => {
    onClose();
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="rounded-full border bg-slate-200 p-3 text-slate-600">
          <MdRemoveShoppingCart size={90} />
        </div>
        <div className="mt-3 text-2xl font-semibold">Your Cart is Empty!</div>
        <p className="text-md mt-4 font-normal text-slate-400">
          Browse our categories and discover our best deals!
        </p>
        <div className="mt-5 rounded-md">
          <Button label="Start Shopping" onClick={handleEmpty} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="mt-8 grid grid-cols-5 items-center gap-4 pb-2 text-xs">
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
      <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-300 py-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            clear
          />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="texxt-base mt-8 flex w-full justify-between gap-1">
            <span>Subtotals:</span>
            <span className="font-semibold">
              {FormatPrice(cartTotalAmount)}
            </span>
          </div>

          <Button
            label={currentUser ? "Proceed to Pay" : "Login To Checkout"}
            onClick={handleProceed}
            google={currentUser ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default CartUserClient;

"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FormatPrice } from "@/utils/FormatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ItemContentPay from "../ItemContentPay";
import Heading from "@/app/components/Heading";
import ButtonDelivery from "@/app/components/ButtonDelivery";
import { toast } from "react-toastify";

interface DeliveryClientProps {
  currentUser: SafeUser | null;
}

const DeliveryClient: React.FC<DeliveryClientProps> = ({ currentUser }) => {
  const { cartProducts, cartTotalAmount, handleClearCartAfter } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!currentUser) {
      toast.warning("Please login to continue");
      return;
    }

    const orderData = {
      userId: currentUser.id,
      amount: cartTotalAmount,
      products: cartProducts,
    };

    try {
      const response = await fetch("/api/ondelivery/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json(); // Extract the response data
        toast.success("Order Created");
        handleClearCartAfter(); // Clear the cart after successful order creation
        if (data.order && data.order.id) {
          router.push(`/order/${data.order.id}`); // Redirect to the order details page
        } else {
          console.error("No order ID returned");
          toast.error("An error occurred: No order ID returned");
        }
      } else {
        const data = await response.json();
        console.error("Error saving order:", data.error);
        toast.warning("Order not saved");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your order");
    }
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="border rounded-full bg-slate-200 text-slate-600 p-3">
          <RiSecurePaymentLine size={90} />
        </div>
        <div className="text-2xl mt-3 font-semibold">
          No Payments Available!
        </div>
        <p className="text-slate-400 text-md font-normal mt-4">
          Browse our categories and discover our best deals! Add a product to
          cart to continue to checkout
        </p>
        <div className="border bg-orange-500 px-3 py-2 rounded-md hover:bg-orange-300 mt-5 md:px-2 md:py-1">
          <Link href={"/"} className="text-white flex items-center gap-1 mt-2">
            <MdArrowBack size={30} />
            <span className="text-white">Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Pay On Delivery" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContentPay key={item.id} item={item} />;
          })}
      </div>

      <div>
        <div className="border-t-[1.5px] border-slate-300 py-4 flex flex-col gap-4 mt-8">
          <div className="flex justify-between text-base font-semibold">
            <span>Subtotals</span>
            <span>{FormatPrice(cartTotalAmount)}</span>
          </div>
        </div>
      </div>
      <div className="text-sm">
        <div className="w-full md:w-2/4">
          <ButtonDelivery label="CheckOut" onClick={handleCheckout} />
        </div>

        <Link
          href={"/cart"}
          className="text-orange-500 flex items-center gap-1 mt-2"
        >
          <MdArrowBack size={40} className="md:text-2xl" />
          <span className="text-slate-600 hover:decoration-slice">
            Go back to cart
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DeliveryClient;

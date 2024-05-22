"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContentPay from "./ItemContentPay";
import { FormatPrice } from "@/utils/FormatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import ButtonMpesa from "../components/ButtonMpesa";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonDelivery from "../components/ButtonDelivery";

interface PayClientProps {
  currentUser: SafeUser | null;
}

const PayClient: React.FC<PayClientProps> = ({ currentUser }) => {
  const { cartProducts, cartTotalAmount } = useCart();
  const router = useRouter();

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
        <div className="border bg-orange-500 px-3 py-2 rounded-md hover:bg-orange-300 mt-5">
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
      <Heading title="Make Payment" center />
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

          {/* Accordion for Payment Options */}
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" hover:text-orange-500 text-orange-500 font-semibold">
                Pay with Card
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col justify-between font-semibold items-center md:flex-row">
                    <span>Pay with card </span>
                    <div className="flex flex-row items-center">
                      <Image
                        src="/visa.png"
                        alt="Visa"
                        width={50}
                        height={50}
                      />
                      <Image
                        src="/mastercard.png"
                        alt="Mastercard"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="mt-1 md:mt-0 w-full md:w-auto">
                    <Button
                      label={currentUser ? "Pay" : "Login To Checkout"}
                      onClick={() => {
                        currentUser
                          ? router.push("/checkout")
                          : router.push("/login");
                      }}
                      google={currentUser ? false : true}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className=" hover:text-green-600 text-green-600 font-semibold">
                Lipa na Mpesa
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col justify-between font-semibold items-center md:flex-row">
                    <span>Lipa na Mpesa </span>
                    <Image
                      src="/mpesa.png"
                      alt="Mpesa"
                      width={80}
                      height={50}
                    />
                  </div>
                  <div className="mt-1 md:mt-0 w-full md:w-auto">
                    <ButtonMpesa
                      label={currentUser ? "Pay" : "Login To Checkout"}
                      onClick={() => {
                        currentUser
                          ? router.push("/lipa_pay")
                          : router.push("/login");
                      }}
                      google={currentUser ? false : true}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-sky-600 hover:text-sky-600">
                Pay On Delivery
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col justify-between font-semibold items-center md:flex-row gap-2">
                    <span>Cash</span>
                    <Image src="/pd.png" alt="Cash" width={80} height={40} />
                  </div>
                  <div className="mt-1 md:mt-0 w-full md:w-auto">
                    <ButtonDelivery
                      label={currentUser ? "Pay" : "Login To Checkout"}
                      onClick={() => {
                        currentUser
                          ? router.push("/payment/on_delivery")
                          : router.push("/login");
                      }}
                      google={currentUser ? false : true}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="text-sm">
        <p className="text-slate-600">
          Taxes and Shipping Calculated at checkout
        </p>
        <Link
          href={"/cart"}
          className="text-orange-500 flex items-center gap-1 mt-2"
        >
          <MdArrowBack size={40} />
          <span className="text-slate-600 hover:decoration-slice">
            Go back to cart
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PayClient;

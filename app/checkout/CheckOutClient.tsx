"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  console.log("Client Secret", clientSecret);
  console.log("Payment Intent", paymentIntent);

  useEffect(() => {
    //Create a payment Intent as soon as the Page Loads

    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);

          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.error("Error", error);
          toast.error("Something went Wrong");
        });
    }
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  //Conditional Rendering of MPesa Form
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className=" flex flex-row gap-2 bg-white text-slate-600 p-2">
          <Image src="/visa.png" alt="visa" width={70} height={70} />
          <Image
            src="/mastercard.png"
            alt="mastercard"
            width={70}
            height={70}
          />
          <Image src="/discover.png" alt="discover" width={70} height={70} />
          <Image src="/american.png" alt="american" width={70} height={70} />
        </div>
        <div className="text-2xl  font-semibold mt-4">
          No Payments Available!
        </div>
        <p className="text-slate-400 text-md font-normal mt-4">
          Browse our categories and discover our best deals! Add a product to
          cart to continue to checkout
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
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && (
        <div className="text-center font-semibold">Loading Chechout...</div>
      )}

      {error && (
        <div className="text-center font-semibold text-rose-500">
          Something Went Wrong
        </div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View your orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutClient;

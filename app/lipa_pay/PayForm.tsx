"use client";

import { FcEngineering } from "react-icons/fc";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
import ButtonMpesa from "../components/ButtonMpesa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/FormatPrice";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

interface PayFormProps {}

const PayForm: React.FC<PayFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartTotalAmount, cartProducts } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Conditional Rendering of MPesa Form
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="border border-green-500 rounded-[15px] bg-white text-slate-600 p-2">
          <Image src="/mpesa.png" alt="Mpesa" width={200} height={200} />
        </div>
        <div className="text-2xl  font-semibold mt-4">
          No Payments Available!
        </div>
        <p className="text-slate-400 text-md font-normal mt-4">
          Browse our categories and discover our best deals! Add a product to
          cart to continue to checkout
        </p>
        <div className="border bg-green-500 px-3 py-2 rounded-md hover:bg-green-300 mt-5">
          <Link href={"/"} className="text-white flex items-center gap-1mt-2">
            <MdArrowBack size={30} />
            <span className="text-white">Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = (data: { phone: number; amount: string }) => {
    setIsLoading(true);
    console.log(">>>>>>", onSubmit);
    // Here you can implement your payment processing logic
    // For example, you can make an API call to process the payment
    // After payment processing is complete, you can handle success or error accordingly
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Payment successful!"); // Replace with actual payment success message
    }, 2000); // Simulating payment processing time
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-4 items-center justify-center">
        <Heading title="Pay with Mpesa" />
        <Image src="/mpesa.png" alt="Mpesa" width={200} height={200} />
      </div>
      <hr className="bg-green-300 w-full h-px" />
      <form onSubmit={() => {}} className="space-y-4">
        <Input
          id="phone"
          label="Enter Your Phone Number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="flex items-center gap-4">
          <label className="font-bold text-green-500">Amount:</label>
          <span className="font-semibold text-md">
            {FormatPrice(cartTotalAmount)}
          </span>
        </div>
        <ButtonMpesa
          onClick={() => {}}
          //   onClick={handleSubmit(onSubmit)}
          label={isLoading ? "Processing..." : "Pay"}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default PayForm;

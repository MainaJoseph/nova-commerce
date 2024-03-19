"use client";

import Heading from "../components/Heading";
import ButtonMpesa from "../components/ButtonMpesa";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/FormatPrice";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import Input_Mpesa from "../components/input/input_mpesa";

interface PayFormProps {}

interface FormData {
  phone: string;
  amount: number;
  // Define other form data fields here as needed.
}

const PayForm: React.FC<PayFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartTotalAmount, cartProducts } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // Using the FormData interface here for type safety
    defaultValues: {
      phone: "",
      amount: cartTotalAmount,
    },
  }); // Use the FormData interface here

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

  const onsubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/lipa/stkpush", {
        phone: data.phone, // Correctly accessing phone from data
        amount: data.amount, // Now accessing amount directly from the data parameter
      });
      toast.success("Payment successful!");
    } catch (error) {
      toast.error("Payment failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-4 items-center justify-center">
        <Heading title="Pay with Mpesa" />
        <Image src="/mpesa.png" alt="Mpesa" width={200} height={200} />
      </div>
      <hr className="bg-green-300 w-full h-px" />
      <form onSubmit={() => {}} className="space-y-4">
        <Input_Mpesa
          id="phone"
          label="Enter Your Phone Number"
          type="text" // Specify the type, e.g., "text" for text input
          disabled={isLoading}
          register={register}
          errors={errors}
          required // If the field is required
        />
        <div className="flex items-center gap-4">
          <label className="font-bold text-green-500">Amount:</label>
          <span className="font-semibold text-md">
            {FormatPrice(cartTotalAmount)}
          </span>
        </div>
        <ButtonMpesa
          // onClick={() => {}}
          label={isLoading ? "Loading" : "Pay"}
          onClick={handleSubmit(onsubmit)}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default PayForm;

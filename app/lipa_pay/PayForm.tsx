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

interface PayFormProps {}

const PayForm: React.FC<PayFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartTotalAmount } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

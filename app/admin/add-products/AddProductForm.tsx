"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FcEngineering } from "react-icons/fc";

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  return (
    <>
      <div className="space-y-4 w-full">
        {" "}
        {/* Add a container with spacing */}
        <div className="flex gap-4 items-center justify-center">
          {" "}
          {/* Add spacing to the heading and icon */}
          <Heading title="Add Product" center />
          <FcEngineering size={24} className="mt-0" />
        </div>
        <hr className="bg-orange-500 w-full h-px" />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          type="number"
          errors={errors}
        />
        <Input
          id="brand"
          label="Brand"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <TextArea
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    </>
  );
};

export default AddProductForm;

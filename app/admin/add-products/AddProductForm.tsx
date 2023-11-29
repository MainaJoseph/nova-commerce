"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/input/Input";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

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
      <Heading title="Add a Product" center color="orange" />

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
    </>
  );
};

export default AddProductForm;

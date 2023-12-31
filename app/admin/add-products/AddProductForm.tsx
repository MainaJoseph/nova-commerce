"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/input/CategoryInput";
import CustomCheckBox from "@/app/components/input/CustomCheckBox";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import { Categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FcEngineering } from "react-icons/fc";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

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

  const category = watch("category");
  const setConstantValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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

      <CustomCheckBox
        id="inStock"
        register={register}
        label="This Product Is In Stock"
      />
      <div className="w-full font-medium mt-3">
        <div className="mb-2 font-semibold mt-1 ">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[450px] overflow-y-auto">
          {Categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setConstantValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4 mt-3">
        <div>
          <div className="font-bold ">
            Select the available product colors and Upload their images
          </div>
          <div className="text-small">
            You must upload an image for each of the color selected otherwise
            your color selection will be ingnored
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return <></>;
          })}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;

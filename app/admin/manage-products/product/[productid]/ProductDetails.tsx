"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Rating } from "@mui/material";
import SetColor from "@/app/components/products/SetColor";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SetQuantity from "@/app/components/SetQuantity";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { HashLoader, ScaleLoader } from "react-spinners";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ButtonLoader from "@/app/components/ButtonLoader";
import { MdCached } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export interface CartProductType {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
}

export interface SelectedImgType {
  color: string;
  colorCode: string;
  image: string;
}

const Horizontal = () => {
  return <hr className="my-2 w-[30%]" />;
};

export const FormatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newDescription, setNewDescription] = useState(product.description);
  const [newName, setNewName] = useState(product.name);
  const [newBrand, setNewBrand] = useState(product.brand);
  const [newPrice, setNewPrice] = useState(product.price);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id,
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 25) {
      return toast.error("OPPS Maximum reached");
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return toast.error("OPPS Minimum reached");
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  // handle edit for product name
  const handleEditClickName = () => {
    setIsEditingName(true);
  };

  // handle edit for product description
  const handleEditClickDescription = () => {
    setIsEditingDescription(true);
  };

  // handle edit for product brand
  const handleEditClickBrand = () => {
    setIsEditingBrand(true);
  };

  // handle edit for product price
  const handleEditClickPrice = () => {
    setIsEditingPrice(true);
  };

  // Save edited product name
  const handleSaveClickName = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/product/updateproductname`, {
        id: product.id,
        name: newName,
      });
      toast.success("Name updated successfully");
      setIsEditingName(false);
      router.refresh(); // Reload the page after a successful update
    } catch (error) {
      toast.error("Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited product description
  const handleSaveClickDescription = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/product/updateproduct`, {
        id: product.id,
        description: newDescription,
      });
      toast.success("Description updated successfully");
      setIsEditingDescription(false);
      router.refresh(); // Reload the page after a successful update
    } catch (error) {
      toast.error("Failed to update description");
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited product brand
  const handleSaveClickBrand = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/product/updateproductbrand`, {
        id: product.id,
        brand: newBrand,
      });
      toast.success("Brand updated successfully");
      setIsEditingBrand(false);
      router.refresh(); // Reload the page after a successful update
    } catch (error) {
      toast.error("Failed to update brand");
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited product price
  const handleSaveClickPrice = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/product/updateproductprice`, {
        id: product.id,
        price: newPrice,
      });
      toast.success("Price updated successfully");
      setIsEditingPrice(false);
      router.refresh(); // Reload the page after a successful update
    } catch (error) {
      toast.error("Failed to update price");
    } finally {
      setIsLoading(false);
    }
  };

  //Toggle between In stock and out of stock
  const handleToggleStatus = useCallback(
    async (id: string, inStock: boolean) => {
      setIsLoading(true);
      try {
        await axios.put("/api/product", { id, inStock: !inStock });
        toast.success("Product Status Changed");
        router.refresh();
      } catch (err) {
        toast.error("OPPS!..Something went wrong");
        console.error("Error toggling product status:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  return (
    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm text-slate-500">
        <div className="flex flex-row gap-2">
          {isEditingName ? (
            <textarea
              className="w-3/4 border p-3"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <h2 className="text-3xl font-medium text-slate-700">
              {product.name}
            </h2>
          )}
          {isEditingName ? (
            <ButtonLoader
              label={
                isLoading ? <ScaleLoader color="#fff" height={15} /> : "Save"
              }
              onClick={handleSaveClickName}
              disabled={isLoading}
              small
            />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiEdit
                    size={24}
                    className="cursor-pointer"
                    onClick={handleEditClickName}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white">
                  <p>Edit Product Name</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} Reviews</div>
        </div>
        <Horizontal />
        {isEditingDescription ? (
          <textarea
            className="border p-5"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        ) : (
          <div className="text-justify">{product.description}</div>
        )}
        {isEditingDescription ? (
          <ButtonLoader
            label={
              isLoading ? <ScaleLoader color="#fff" height={15} /> : "Save"
            }
            onClick={handleSaveClickDescription}
            disabled={isLoading}
          />
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaEdit
                  size={24}
                  className="cursor-pointer"
                  onClick={handleEditClickDescription}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 text-white">
                <p>Edit Description</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Horizontal />

        <div>
          <span className="font-semibold">CATEGORY:</span>
          <div className="text-md font-medium text-slate-700">
            {product.category}
          </div>
        </div>
        {/* ///////////////////////////////////////////////////////////////////////////////////// */}
        <Horizontal />
        <div>
          <span className="font-semibold">BRAND:</span>
          <div className="flex flex-row gap-2">
            {isEditingBrand ? (
              <textarea
                className="w-3/4 border p-3"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
              />
            ) : (
              <h2 className="text-md font-medium text-slate-700">
                {product.brand}
              </h2>
            )}
            {isEditingBrand ? (
              <ButtonLoader
                label={
                  isLoading ? <ScaleLoader color="#fff" height={15} /> : "Save"
                }
                onClick={handleSaveClickBrand}
                disabled={isLoading}
                small
              />
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CiEdit
                      size={24}
                      className="cursor-pointer"
                      onClick={handleEditClickBrand}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white">
                    <p>Edit Brand</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////// */}
          <Horizontal />
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "In Stock ✅" : "Out of Stock ❌"}
          </div>
          {isLoading ? (
            <HashLoader size={25} color="#FFA500" />
          ) : (
            <MdCached
              size={25}
              onClick={() => handleToggleStatus(product.id, product.inStock)}
              className="cursor-pointer"
            />
          )}
        </div>

        <Horizontal />

        {/* //////////////////////////////////////////////////////////////////////////////// */}

        <div className="flex items-center gap-2 font-semibold text-slate-900">
          {isEditingPrice ? (
            <input
              type="number"
              className="w-24 border p-2"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
            />
          ) : (
            FormatPrice(product.price)
          )}
          {isEditingPrice ? (
            <ButtonLoader
              label={
                isLoading ? <ScaleLoader color="#fff" height={15} /> : "Save"
              }
              onClick={handleSaveClickPrice}
              disabled={isLoading}
              small
            />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiEdit
                    size={24}
                    className="cursor-pointer"
                    onClick={handleEditClickPrice}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white">
                  <p>Edit Price</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* //////////////////////////////////////////////////////////////////////////////// */}

        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 flex items-center gap-1 text-slate-500">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product Added To Cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            {product.inStock ? (
              <div className="max-w-[300px]">
                <Button
                  label="Add To Cart"
                  onClick={() => handleAddProductToCart(cartProduct)}
                />
              </div>
            ) : (
              <div className="max-w-[300px]">
                <Button label="Out of Stock" disabled onClick={() => {}} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

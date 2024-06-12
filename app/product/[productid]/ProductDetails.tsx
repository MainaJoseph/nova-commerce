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

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: discountedPrice,
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

  return (
    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} Reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "in Stock ✅" : "out of Stock ❌"}
        </div>
        <Horizontal />
        <div className="flex flex-col items-start gap-2">
          {product.discount ? (
            <div className="flex flex-col gap-1">
              <span className="text-rose-500 line-through">
                Ksh {product.price}
              </span>
              <span className="font-semibold text-black">
                Ksh {discountedPrice.toFixed(2)}
              </span>
              <span className="text-green-500">({product.discount} % off)</span>
            </div>
          ) : (
            <div className="font-semibold">{product.price} Ksh</div>
          )}
        </div>
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

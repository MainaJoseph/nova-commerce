"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productid]/ProductDetails";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:m-h-[400px]">
      <div></div>
      <div></div>
    </div>
  );
};

export default ProductImage;

import { type } from "os";
import { createContext, useContext, useState } from "react";

type cartContextType = {
  cartTotalQty: number;
};

export const CartContext = createContext<cartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);

  const value = {
    cartTotalQty,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};

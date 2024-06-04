"use client";

// CartUserCart component

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CartUserClient from "@/app/components/cart/CartUserClient";
import { SafeUser } from "@/types";
import { Button } from "@/components/ui/button";

interface CartUserCartProps {
  currentUser: SafeUser | null;
}

const CartUserCart: React.FC<CartUserCartProps> = ({ currentUser }) => {
  const router = useRouter();

  function handleCheckCart() {
    // Reload the page
    window.location.reload();
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="md:w-3/2 h-4/5 w-full max-w-3xl overflow-scroll bg-white text-slate-900">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <div>
            <p>Content of your Basket</p>
            <Button
              className="mt-2 bg-orange-500 py-3 text-white shadow-md hover:bg-orange-400"
              onClick={handleCheckCart}
            >
              Check Cart
            </Button>
          </div>
        </DialogHeader>
        <CartUserClient
          currentUser={currentUser}
          onClose={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CartUserCart;

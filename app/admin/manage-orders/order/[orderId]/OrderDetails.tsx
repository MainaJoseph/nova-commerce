"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { FormatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const [currentOrder, setCurrentOrder] = useState(order);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMarkAsPaid = async () => {
    if (currentOrder.status === "complete") {
      toast.warning("Order is already marked as paid");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        toast.success("Order marked as paid");
        setCurrentOrder(updatedOrder);
        router.refresh(); // Refresh the page
      } else {
        console.error("Failed to update order status");
        toast.error("Failed to mark as paid");
      }
    } catch (error) {
      console.error("An error occurred while updating order status:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>
      <div>Ref NO: {order.paymentIntentId}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{FormatPrice(order.amount)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Payment Status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Delivery Status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        Date:{" "}
        <span className="font-semibold">
          {moment(order.createdDate).fromNow()}
        </span>
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">Product</div>
          <div className=" justify-self-center">Price</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">Total</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
      <div className="mt-5 md:px-2 md:py-1 w-1/4 hover:translate-y-1 transition hover:font-semibold">
        <AlertDialog>
          <AlertDialogTrigger>
            <button
              className={`py-2 px-3 rounded-md hover:translate-y-1 transition hover:font-semibold text-white shadow-md border bg-sky-600 hover:bg-sky-500 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Mark as Paid"}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white text-slate-800">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this order as paid?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-rose-500 hover:bg-rose-400 text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={`bg-sky-600 hover:bg-sky-500 text-white ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handleMarkAsPaid}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default OrderDetails;

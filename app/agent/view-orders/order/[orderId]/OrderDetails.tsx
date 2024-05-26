"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { FormatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import {
  MdAccessTimeFilled,
  MdArrowBack,
  MdDeliveryDining,
  MdDone,
} from "react-icons/md";
import OrderItem from "./OrderItem";
import Link from "next/link";
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
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle deliver
  const handleDeliver = useCallback(
    (id: string) => {
      if (order.deliveryStatus === "delivered") {
        toast.warning("Order is already delivered");
        return;
      }

      if (order.deliveryStatus === "pending") {
        toast.info("The dispatched status is still pending");
        return;
      }

      setIsLoading(true);
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "delivered",
        })
        .then((res) => {
          toast.success("Order Delivered");
          router.refresh();
        })
        .catch((err) => {
          toast.error("OPPS!..Something went wrong");
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [order.deliveryStatus, router]
  );

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
          <div className="justify-self-center">Price</div>
          <div className="justify-self-center">QTY</div>
          <div className="justify-self-end">Total</div>
        </div>
        {order.products &&
          order.products.map((item) => <OrderItem key={item.id} item={item} />)}
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
              {isLoading ? "Loading..." : "Mark as Delivered"}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white text-slate-800">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this order as delivered?
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
                onClick={() => handleDeliver(order.id)}
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

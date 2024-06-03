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

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>

      <div>Ref NO: {order.paymentIntentId}</div>
      <div>
        Total Amaount:{" "}
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
        <Link
          href={"/account"}
          className="text-white flex items-center gap-1 mt-2"
        >
          <MdArrowBack size={30} className="text-orange-500" />
          <span className="text-slate-800 relative ">
            Back to profile
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-orange-500 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;

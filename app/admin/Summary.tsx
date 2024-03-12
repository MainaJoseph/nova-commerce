"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { FormatPrice } from "@/utils/FormatPrice";
import { FormatNumber } from "@/utils/FormatNumber";
import {
  FaBox,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type summaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<summaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSales = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });
      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      console.log("Total Sales:", totalSales);

      tempData.sale.digit = totalSales;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2  p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total Sale" ? (
                    <>
                      <FaMoneyBillWave
                        size={30}
                        className="
                      mr-2 inline-flex text-green-400"
                      />
                      {FormatPrice(summaryData[key].digit)}
                    </>
                  ) : summaryData[key].label === "Total Products" ? (
                    <>
                      <MdOutlineProductionQuantityLimits
                        size={30}
                        className="
                      mr-2 inline-flex text-orange-300"
                      />
                      {FormatNumber(summaryData[key].digit)}
                    </>
                  ) : summaryData[key].label === "Total Orders" ? (
                    <>
                      <FaClipboardList
                        size={28}
                        className="
                      mr-2 inline-flex text-orange-300"
                      />
                      {FormatNumber(summaryData[key].digit)}
                    </>
                  ) : summaryData[key].label === "Paid Orders" ? (
                    <>
                      <FaCheckCircle
                        size={20}
                        className="
                      mr-2 inline-flex text-green-300"
                      />
                      {FormatNumber(summaryData[key].digit)}
                    </>
                  ) : summaryData[key].label === "Unpaid Orders" ? (
                    <>
                      <FaClock
                        size={20}
                        className="
                      mr-2 inline-flex text-rose-300"
                      />
                      {FormatNumber(summaryData[key].digit)}
                    </>
                  ) : summaryData[key].label === "Total Users" ? (
                    <>
                      <FaUsers
                        size={23}
                        className="
                      mr-2 inline-flex text-orange-300"
                      />
                      {FormatNumber(summaryData[key].digit)}
                    </>
                  ) : (
                    <>{FormatNumber(summaryData[key].digit)}</>
                  )}
                </div>

                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;

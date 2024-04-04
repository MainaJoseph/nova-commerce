"use client";

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
import { Order, Product, User } from "@prisma/client";

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
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidSales: {
      label: "Paid Sales",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    pendingSales: {
      label: "Pending Sales",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
    admins: {
      label: "Admins",
      digit: 0,
    },
    agents: {
      label: "Agents",
      digit: 0,
    },
    regularUsers: {
      label: "Regular Users",
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

      const pendingOrderSales = orders.reduce((acc, item) => {
        if (item.status === "pending") {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidSales = totalSales - pendingOrderSales;

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const adminCount = users.filter((user) => user.role === "ADMIN").length;
      const agentCount = users.filter((user) => user.role === "AGENT").length;
      const regularUserCount = users.filter(
        (user) => user.role === "USER"
      ).length;

      tempData.sale.digit = totalSales;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.pendingSales.digit = pendingOrderSales;
      tempData.paidSales.digit = paidSales;
      tempData.unpaidOrders.digit = orders.length - paidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;
      tempData.admins.digit = adminCount;
      tempData.agents.digit = agentCount;
      tempData.regularUsers.digit = regularUserCount;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = [
    "sale",
    "orders",
    "paidSales",
    "paidOrders",
    "pendingSales",
    "unpaidOrders",
    "products",
    "users",
    "admins",
    "agents",
    "regularUsers",
  ];

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys.map((key) => (
          <div
            key={key}
            className="rounded-xl border-2  p-4 flex flex-col items-center gap-2 transition"
          >
            <div className="text-xl md:text-xl font-semibold">
              {summaryData[key].label === "Total Sale" ? (
                <>
                  <FaMoneyBillWave
                    size={30}
                    className="
                  mr-2 inline-flex text-orange-400"
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
              ) : summaryData[key].label === "Pending Sales" ? (
                <>
                  <FaMoneyBillWave
                    size={30}
                    className="mr-2 inline-flex text-rose-400"
                  />
                  {FormatPrice(summaryData[key].digit)}
                </>
              ) : summaryData[key].label === "Paid Sales" ? (
                <>
                  <FaMoneyBillWave
                    size={30}
                    className="mr-2 inline-flex text-green-400"
                  />
                  {FormatPrice(summaryData[key].digit)}
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
              ) : summaryData[key].label === "Total Paid Order Sales" ? (
                <>
                  <FaMoneyBillWave
                    size={20}
                    className="
                  mr-2 inline-flex text-green-300"
                  />
                  {FormatPrice(summaryData[key].digit)}
                </>
              ) : summaryData[key].label === "Admins" ? (
                <>
                  <FaUsers
                    size={23}
                    className="
                  mr-2 inline-flex text-slate-00"
                  />
                  {FormatNumber(summaryData[key].digit)}
                </>
              ) : summaryData[key].label === "Agents" ? (
                <>
                  <FaUsers
                    size={23}
                    className="
                  mr-2 inline-flex text-purple-500"
                  />
                  {FormatNumber(summaryData[key].digit)}
                </>
              ) : summaryData[key].label === "Regular Users" ? (
                <>
                  <FaUsers
                    size={23}
                    className="
                  mr-2 inline-flex text-teal-400"
                  />
                  {FormatNumber(summaryData[key].digit)}
                </>
              ) : (
                <>{FormatNumber(summaryData[key].digit)}</>
              )}
            </div>
            <div>{summaryData[key].label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;

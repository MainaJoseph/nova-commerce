"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FormatPrice } from "@/utils/FormatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionsBtn from "@/app/components/ActionsBtn";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import moment from "moment";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: FormatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amaount (Kes)",
      width: 130,
      renderCell: (params) => {
        return <div className="font-bold slate-800">{params.row.amount}</div>;
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
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
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
        );
      },
    },

    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionsBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionsBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionsBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "dispatched",
        })
        .then((res) => {
          toast.success("Order Dispached");
          router.refresh();
        })
        .catch((err) => {
          toast.error("OPPS!..Something went wrong");
          console.log("err");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [router]
  );

  const handleDeliver = useCallback(
    (id: string) => {
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
          console.log("err");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [router]
  );

  return (
    <div className="max-w-[1250px] m-auto text-xl">
      {/* Add spinner */}
      {isLoading && <Spinner />}
      <div className="mb-4 mt-4">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;

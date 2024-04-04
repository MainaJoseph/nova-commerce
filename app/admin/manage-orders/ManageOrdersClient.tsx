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
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false); // State to manage the open/close state of the AlertDialog for delivery
  const [isDispatchDialogOpen, setIsDispatchDialogOpen] = useState(false); // State to manage the open/close state of the AlertDialog for dispatch
  const [orderIdToDeliver, setOrderIdToDeliver] = useState(""); // State to store the ID of the order to be delivered
  const [orderIdToDispatch, setOrderIdToDispatch] = useState(""); // State to store the ID of the order to be dispatched
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
                handleDispatchConfirmation(params.row.id);
              }}
            />
            <ActionsBtn
              icon={MdDone}
              onClick={() => {
                handleDeliveryConfirmation(params.row.id);
              }}
            />
            <ActionsBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
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
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [router]
  );
  /////////////////////////////////////////////////////////////////////////////////////
  // fuction for confirmation dialogue to mark as delivered
  const handleDeliveryConfirmation = (orderId: string) => {
    const orderToDeliver = orders.find((order) => order.id === orderId);
    if (orderToDeliver && orderToDeliver.deliveryStatus === "delivered") {
      // Show toast indicating the order is already delivered
      toast.warning("This order is already marked as delivered.");
    } else {
      setOrderIdToDeliver(orderId);
      setIsDeliveryDialogOpen(true);
    }
  };

  const handleCloseAlertDialog = () => {
    setIsDeliveryDialogOpen(false);
  };

  const handleContinueAction = () => {
    handleDeliver(orderIdToDeliver); // Call your delivery function with the stored order ID
    setIsDeliveryDialogOpen(false); // Close the AlertDialog
  };
  //////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////
  // fuction for confirmation dialogue to mark as dispatched
  const handleDispatchConfirmation = (orderId: string) => {
    const orderToDispatch = orders.find((order) => order.id === orderId);
    if (orderToDispatch && orderToDispatch.deliveryStatus === "dispatched") {
      // Show toast indicating the order is already dispatched
      toast.warning("This order is already marked as dispatched.");
    } else {
      setOrderIdToDispatch(orderId);
      setIsDispatchDialogOpen(true);
    }
  };

  const handleCloseAlertDialogDispatch = () => {
    setIsDispatchDialogOpen(false);
  };

  const handleContinueActionDispatch = () => {
    handleDispatch(orderIdToDispatch); // Call your dispatch function with the stored order ID
    setIsDispatchDialogOpen(false); // Close the AlertDialog
  };
  ////////////////////////////////////////////////////////////////////////////////////////////

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
      {/* AlertDialog component for Delivery */}
      <div className="bg-white">
        <AlertDialog open={isDeliveryDialogOpen}>
          <AlertDialogContent className="bg-white border-slate-400 border-[1px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this order as dispatched?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={handleCloseAlertDialog}
                className="border-slate-400"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleContinueAction}
                className="bg-orange-400 text-white"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* AlertDialog component for Dispatch */}
      <div className="bg-white">
        <AlertDialog open={isDispatchDialogOpen}>
          <AlertDialogContent className="bg-white border-slate-400 border-[1px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this order as delivered?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={handleCloseAlertDialogDispatch}
                className="border-slate-400"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleContinueActionDispatch}
                className="bg-orange-400 text-white"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ManageOrdersClient;

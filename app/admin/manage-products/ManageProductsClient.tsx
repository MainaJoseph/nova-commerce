"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FormatPrice } from "@/utils/FormatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionsBtn from "@/app/components/ActionsBtn";
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: FormatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "price",
      headerName: "Price(Kes)",
      width: 160,
      renderCell: (params) => {
        return <div className="font-bold slate-800">{params.row.price}</div>;
      },
    },
    { field: "category", headerName: "Category", width: 120 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "InStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="InStock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Out of Stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionsBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStatus(params.row.id, params.row.inStock);
              }}
            />
            <ActionsBtn icon={MdDelete} onClick={() => {}} />
            <ActionsBtn icon={MdRemoveRedEye} onClick={() => {}} />
          </div>
        );
      },
    },
  ];

  const handleToggleStatus = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then((res) => {
          toast.success("Product Status Changed");
          router.refresh();
        })
        .catch((err) => {
          toast.error("OPPS!..Something went wrong");
          console.log("err");
        });
    },
    [router]
  );

  return (
    <div className="max-w-[1250px] m-auto text-xl">
      <div className="mb-4 mt-4">
        <Heading title="Manage Products" center />
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

export default ManageProductsClient;
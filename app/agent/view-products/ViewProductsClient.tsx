"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FormatPrice } from "@/utils/FormatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdClose, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionsBtn from "@/app/components/ActionsBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ViewProductsClientProps {
  products: Product[];
}

const ViewProductsClient: React.FC<ViewProductsClientProps> = ({
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
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(Kes)",
      width: 170,
      renderCell: (params) => {
        return <div className="font-bold slate-800">{params.row.price}</div>;
      },
    },
    { field: "category", headerName: "Category", width: 120 },
    { field: "brand", headerName: "Brand", width: 120 },
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
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ActionsBtn
                    icon={MdRemoveRedEye}
                    onClick={() => {
                      router.push(`/product/${params.row.id}`);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-white">
                  <p>View Product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1250px] m-auto text-xl">
      <div className="mb-4 mt-4">
        <Heading title="View Products" center />
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

export default ViewProductsClient;

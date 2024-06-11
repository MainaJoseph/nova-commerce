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
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  const [isLoading, setIsLoading] = useState(false);
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
        return <div className="slate-800 font-bold">{params.row.price}</div>;
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
          <div className="flex w-full justify-between gap-4">
            <ActionsBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStatus(params.row.id, params.row.inStock);
              }}
            />
            <ActionsBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionsBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`manage-products/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStatus = useCallback(
    (id: string, inStock: boolean) => {
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [router],
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      try {
        toast.info("Deleting product...");

        // Function to handle image deletion
        const handleImageDelete = async () => {
          try {
            for (const item of images) {
              if (item.image) {
                const imageRef = ref(storage, item.image);
                await deleteObject(imageRef);
                console.log("Image Deleted", item.image);
              }
            }
          } catch (error) {
            console.error("Error deleting image:", error);
            throw error; // Rethrow the error to be caught by the outer try-catch block
          }
        };

        await handleImageDelete();

        // Delete product
        await axios.delete(`/api/product/${id}`);
        toast.success("Product deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete product");
        console.error("Delete Product Error:", error);
      }
    },
    [storage, router],
  );

  return (
    <div className="m-auto max-w-[1250px] text-xl">
      {/* Add spinner */}
      {isLoading && <Spinner />}
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

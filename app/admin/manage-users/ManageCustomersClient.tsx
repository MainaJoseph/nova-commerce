"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete, MdOutlineRealEstateAgent } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserCheck } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Spinner from "@/app/components/Spinner";
import Heading from "@/app/components/Heading";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  createdAt: Date | null;
  role: string;
}

interface ManageCustomersClientProps {
  users: User[];
}

const ManageCustomersClient: React.FC<ManageCustomersClientProps> = ({
  users,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<User[]>([]);

  const router = useRouter();

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.role === "USER");
    setRows(filteredUsers);
  }, [users]);

  const updateUserRole = useCallback(
    async (id: string, role: string) => {
      setIsLoading(true);
      try {
        const response = await axios.put("/api/users/updateUserRole", {
          id,
          role,
        });
        const updatedUser = response.data;
        setRows((prevRows) =>
          prevRows.map((user) =>
            user.id === updatedUser.id
              ? { ...user, role: updatedUser.role }
              : user,
          ),
        );
        toast.success("User role changed successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to change user role");
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const deleteUser = async (userId: string) => {
    const isAdmin = rows.find((user) => user.id === userId)?.role === "ADMIN";
    if (isAdmin) {
      toast.warning("Admin users cannot be deleted.");
      return;
    }
    try {
      setIsLoading(true);
      await axios.delete("/api/users/deleteUsers", { data: { id: userId } });
      setRows((prevRows) => prevRows.filter((user) => user.id !== userId));
      toast.success("User deleted successfully.");
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "createdAt", headerName: "Created At", width: 230 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        let icon;
        let bg = "";
        switch (params.value) {
          case "ADMIN":
            icon = GrUserAdmin;
            bg = "bg-slate-700";
            break;
          case "USER":
            icon = FaUserCheck;
            bg = "bg-teal-400";
            break;
          case "AGENT":
            icon = MdOutlineRealEstateAgent;
            bg = "bg-purple-400";
            break;
          default:
            icon = FaUserCheck;
            bg = "bg-gray-400";
        }
        return (
          <div className={`${bg} rounded-full p-1 text-center text-white`}>
            {params.value}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <div className="flex w-full justify-between gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() => updateUserRole(params.row.id, "USER")}
                      disabled={isLoading || params.row.role === "USER"}
                      className={`rounded-md border-[1px] border-slate-400 px-2 py-1 focus:outline-none ${
                        params.row.role === "USER"
                          ? "cursor-not-allowed bg-none text-teal-400"
                          : "bg-none text-teal-400"
                      }`}
                    >
                      <FaUserCheck size={21} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 text-white">
                    <p>Make User</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() => updateUserRole(params.row.id, "AGENT")}
                      disabled={isLoading || params.row.role === "AGENT"}
                      className={`rounded-md border-[1px] border-slate-400 px-2 py-1 focus:outline-none ${
                        params.row.role === "AGENT"
                          ? "cursor-not-allowed bg-none text-purple-500"
                          : "bg-none text-purple-500"
                      }`}
                    >
                      <MdOutlineRealEstateAgent size={21} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 text-white">
                    <p>Make Agent</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() => deleteUser(params.row.id)}
                      disabled={isLoading}
                      className="rounded-md border-[1px] border-slate-400 px-2 py-1 focus:outline-none"
                    >
                      <MdDelete size={21} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-rose-400 text-white">
                    <p>Delete User</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="m-auto max-w-[1250px] text-xl">
      {isLoading && <Spinner />}
      <div className="mb-4 mt-4">
        <Heading title="Manage Customers" center />
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

export default ManageCustomersClient;

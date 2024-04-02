"use client";

import { User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import prisma from "@/libs/prismadb";
import ActionsBtn from "@/app/components/ActionsBtn";
import { MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Status from "@/app/components/Status";

interface ManageUsersClientProps {
  users: User[];
}

const ManageUsersClient: React.FC<ManageUsersClientProps> = ({ users }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  // Define state to handle loading state
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  // Function to handle role update
  const changeUserRole = useCallback(async (id: string, role: string) => {
    setIsLoading(true);
    try {
      const response = await axios.put("/api/users/updateUserRole", {
        id,
        role,
      });
      const updatedUser = response.data;
      if (updatedUser.role === "ADMIN") {
        toast.warning("User is already an admin");
      } else {
        toast.success("User role changed successfully");
      }
    } catch (error) {
      toast.error("Failed to change user role");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (users) {
      const userRows = users.map((user) => ({
        id: user.id,
        name: user.name || "-",
        email: user.email || "-",
        createdAt: user.createdAt
          ? new Date(user.createdAt).toLocaleString()
          : "-",
        role: user.role || "-",
      }));
      setRows(userRows);
    }
  }, [users]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ActionsBtn
                    icon={GrUserAdmin}
                    onClick={() => changeUserRole(params.row.id, "ADMIN")} // Pass user ID to changeUserRole function
                    disabled={isUpdatingRole} // Disable button while role update is in progress
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-white">
                  <p>Make Admin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <ActionsBtn icon={MdDone} onClick={() => {}} />
            <ActionsBtn icon={MdDelete} onClick={() => {}} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1250px] m-auto text-xl">
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

export default ManageUsersClient;

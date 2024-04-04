"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete, MdOutlineRealEstateAgent } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserCheck } from "react-icons/fa";
import Spinner from "@/app/components/Spinner";
import Heading from "@/app/components/Heading";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  createdAt: Date | null;
  role: string;
}

interface ViewUsersClientProps {
  users: User[];
}

const ViewUsersClient: React.FC<ViewUsersClientProps> = ({ users }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<User[]>(users); // Initialize rows state with users data

  const updateUserRole = useCallback(async (id: string, role: string) => {
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
            : user
        )
      ); // Update the role in the rows state
      toast.success("User role changed successfully");
    } catch (error) {
      toast.error("Failed to change user role");
    } finally {
      setIsLoading(false);
    }
  }, []);

  //function to delete users

  const deleteUser = async (userId: string) => {
    // Check if the user is an admin
    const isAdmin = rows.find((user) => user.id === userId)?.role === "ADMIN";

    if (isAdmin) {
      toast.warning("Admin users cannot be deleted.");
      return;
    }
    try {
      setIsLoading(true);
      await axios.delete("/api/users/deleteUsers", {
        data: { id: userId },
      });
      // Remove the deleted user from the rows state
      setRows((prevRows) => prevRows.filter((user) => user.id !== userId));
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setRows(users); // Update rows when users prop changes
  }, [users]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 290 },
    { field: "email", headerName: "Email", width: 290 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
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
          <div className={`${bg} text-white text-center rounded-full p-1`}>
            {params.value}
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1250px] m-auto text-xl">
      {/* Add spinner */}
      {isLoading && <Spinner />}
      <div className="mb-4 mt-4">
        <Heading title="View Users" center />
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

export default ViewUsersClient;

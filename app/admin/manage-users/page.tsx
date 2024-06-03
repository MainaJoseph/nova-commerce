import React from "react";
import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ManageUsersClient from "./ManageUsersClient";
import getUsers from "@/actions/getUsers";
import ManageCustomersClient from "./ManageCustomersClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageUsers = async () => {
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Opps! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="flex space-x-4">
            <TabsTrigger
              value="users"
              className="px-4 py-3 rounded-md data-[state=active]:bg-orange-500 data-[state=active]:text-white bg-gray-200 text-gray-700"
            >
              Manage Users
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="px-4 py-3 rounded-md data-[state=active]:bg-orange-500 data-[state=active]:text-white bg-gray-200 text-gray-700"
            >
              Manage Customers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <ManageUsersClient users={users} />
          </TabsContent>
          <TabsContent value="customers">
            <ManageCustomersClient users={users} />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default ManageUsers;

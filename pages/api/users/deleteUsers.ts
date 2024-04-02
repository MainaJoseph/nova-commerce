// pages/api/users/deleteUser.ts

import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  try {
    // Check if the user is an admin
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (user?.role === "ADMIN") {
      return res.status(403).json({ error: "Admin users cannot be deleted." });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

// pages/api/users/updateUserRole.ts
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, role } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { role },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

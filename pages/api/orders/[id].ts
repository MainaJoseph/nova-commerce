import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { id } = req.query;

    try {
      const updatedOrder = await prisma.order.update({
        where: { id: String(id) },
        data: { status: "complete" },
      });

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Error updating order status" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: String(id) },
        data: { status: "complete" },
      });

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Error updating order status" });
    }
  } else if (req.method === "GET") {
    try {
      const order = await prisma.order.findUnique({
        where: { id: String(id) },
        include: { user: true }, // Ensure user details are included
      });

      console.log(order); // Log the order to ensure user data is included

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: "Error fetching order details" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

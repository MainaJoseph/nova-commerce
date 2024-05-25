import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"; // Adjust the path to your prisma client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, amount, products } = req.body;

    try {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          amount,
          currency: "KES",
          status: "pending",
          paymentIntentId: "ondelivery",
          products,
          deliveryStatus: "not delivered",
        },
      });

      res.status(200).json({ order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to save the order" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

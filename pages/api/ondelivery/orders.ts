import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"; // Adjust the path to your prisma client

function generatePaymentIntentId() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}-ondelivery`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, amount, products } = req.body;

    try {
      const paymentIntentId = generatePaymentIntentId();

      const newOrder = await prisma.order.create({
        data: {
          userId,
          amount,
          currency: "KES",
          status: "pending",
          paymentIntentId,
          products,
          deliveryStatus: "pending",
        },
      });

      res.status(200).json({ order: newOrder });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Unable to save the order" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

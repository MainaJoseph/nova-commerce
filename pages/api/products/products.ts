import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"; // Ensure you have your Prisma client configured

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchParams } = req.query;
  try {
    const products = await prisma.product.findMany({
      // Add your searchParams logic here if needed
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

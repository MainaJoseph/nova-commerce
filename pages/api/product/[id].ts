import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb"; // Ensure prisma is correctly imported

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const product = await prisma.product.delete({
      where: { id: String(id) },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error deleting product from database:", error);
    return res.status(500).json({ message: "Error deleting product" });
  }
}

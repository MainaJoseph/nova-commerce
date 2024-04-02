// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchTerm } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm as string, mode: "insensitive" } },
          { brand: { contains: searchTerm as string, mode: "insensitive" } },
          { category: { contains: searchTerm as string, mode: "insensitive" } },
        ],
      },
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const { id, name } = req.body;

    try {
      const updatedProductName = await prisma.product.update({
        where: { id },
        data: { name },
      });
      res.status(200).json({
        message: "Product name Changed",
        product: updatedProductName,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update product name", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const { id, description } = req.body;

    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { description },
      });
      res.status(200).json({
        message: "Product description updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update product description", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

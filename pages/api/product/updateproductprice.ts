import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const { id, price } = req.body;

    try {
      const updatedProductPrice = await prisma.product.update({
        where: { id },
        data: { price },
      });
      res.status(200).json({
        message: "Product price Changed",
        product: updatedProductPrice,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update product price", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

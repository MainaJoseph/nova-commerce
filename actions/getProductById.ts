import prisma from "@/libs/prismadb";

interface IParams {
  productid?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productid } = params;

    if (!productid) {
      // Handle the case when productId is missing
      return null;
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productid,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    if (!product) {
      return null; // Product not found
    }

    return product;
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw error;
  }
}

import prisma from "@/libs/prismadb";

interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productId } = params;

    console.log("ProductId>>>>>", productId);

    if (!productId) {
      // Handle the case when productId is missing
      return null;
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
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

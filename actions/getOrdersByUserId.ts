import prisma from "@/libs/prismadb";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
      where: {
        userId: userId,
      },
    });

    return orders; // Return the orders fetched from the database
  } catch (error) {
    // Handle errors if necessary
    console.error("Error fetching orders:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

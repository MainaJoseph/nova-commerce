import prisma from "@/libs/prismadb";

export default async function getUsersWithRoles() {
  try {
    const usersWithRoles = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    return usersWithRoles;
  } catch (error: any) {
    throw new Error(error);
  }
}

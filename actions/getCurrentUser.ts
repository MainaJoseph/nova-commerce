import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: { orders: true },
    });

    if (!currentUser) {
      return null;
    }

    const createdAt = currentUser.createdAt
      ? currentUser.createdAt.toISOString()
      : null;
    const updatedAt = currentUser.updatedAt
      ? currentUser.updatedAt.toISOString()
      : null;
    const emailVerified = currentUser.emailVerified
      ? currentUser.emailVerified.toISOString()
      : null;

    return {
      ...currentUser,
      createdAt,
      updatedAt,
      emailVerified,
    };
  } catch (error: any) {
    return null;
  }
}

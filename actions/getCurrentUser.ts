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

    // Convert createdAt/ updatedAt & emailVerified to string or null
    const emailVerified = currentUser.emailVerified?.toISOString() || null;
    const createdAt = currentUser.createdAt
      ? currentUser.createdAt.toISOString()
      : "";
    const updatedAt = currentUser.updatedAt
      ? currentUser.updatedAt.toISOString()
      : "";

    return {
      ...currentUser,
      emailVerified,
      createdAt,
      updatedAt,
    };
  } catch (error: any) {
    return null;
  }
}

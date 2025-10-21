"use server";

import { sendVerificationEmail } from "./sendVerificationEmail";
import prisma from "@/libs/prismadb";

export async function resendVerificationCode(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.email) {
      return { success: false, error: "User not found" };
    }

    if (user.active) {
      return { success: false, error: "Email already verified" };
    }

    const result = await sendVerificationEmail(
      user.email,
      user.name || "User",
      userId,
    );

    return result;
  } catch (error) {
    console.error("Error resending verification code:", error);
    return { success: false, error: "Failed to resend verification code" };
  }
}

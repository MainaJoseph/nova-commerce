"use server";

import prisma from "@/libs/prismadb";

export async function verifyEmailCode(userId: string, code: string) {
  try {
    console.log("🔍 Verifying code for user:", userId, "Code:", code);

    // Find the token
    const activateToken = await prisma.activateToken.findFirst({
      where: {
        userId,
        token: code,
      },
    });

    if (!activateToken) {
      console.log("❌ Token not found");
      return { success: false, error: "Invalid verification code" };
    }

    console.log("✅ Token found, checking expiration");

    // Check if token is expired
    if (new Date() > new Date(activateToken.expiresAt)) {
      console.log("❌ Token expired");
      await prisma.activateToken.delete({
        where: { id: activateToken.id },
      });
      return { success: false, error: "Verification code has expired" };
    }

    console.log("✅ Token valid, updating user");

    // Update user as active and set email as verified
    await prisma.user.update({
      where: { id: userId },
      data: {
        active: true,
        emailVerified: new Date(),
      },
    });

    // Delete the used token
    await prisma.activateToken.delete({
      where: { id: activateToken.id },
    });

    console.log("✅ Email verified successfully");

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error("❌ Error verifying email:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

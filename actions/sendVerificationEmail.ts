"use server";

import prisma from "@/libs/prismadb";
import resend from "@/libs/resend";
import { getVerificationEmailTemplate } from "@/libs/emailTemplate";

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  userId: string,
) {
  try {
    // Rate limiting: Check if user requested email recently (last 60 seconds)
    const recentToken = await prisma.activateToken.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(Date.now() - 60 * 1000), // Last 60 seconds
        },
      },
    });

    if (recentToken) {
      return {
        success: false,
        error: "Please wait a moment before requesting another code",
      };
    }

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();

    // Set expiration to 10 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Delete any existing tokens for this user
    await prisma.activateToken.deleteMany({
      where: { userId },
    });

    // Create new verification token
    await prisma.activateToken.create({
      data: {
        token: verificationCode,
        userId,
        expiresAt,
      },
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Nova <noreply@azuritek.com>",
      to: email,
      subject: "Verify Your Email - Nova",
      html: getVerificationEmailTemplate(name, verificationCode),
      replyTo: "support@azuritek.com", // Optional: Add reply-to address
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: "Failed to send verification email",
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

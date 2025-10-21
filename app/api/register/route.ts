import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/actions/sendVerificationEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (existingUser) {
      // Check if user has a password already
      if (existingUser.hashedPassword) {
        return NextResponse.json(
          { message: "Email already registered with password login" },
          { status: 400 },
        );
      }

      // Check if user only has OAuth accounts
      const hasOAuthOnly =
        existingUser.accounts.length > 0 && !existingUser.hashedPassword;

      if (hasOAuthOnly) {
        // User exists with OAuth only - add password to their account
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            hashedPassword,
            name, // Update name if provided
          },
        });

        // If already active (from OAuth), no need to verify again
        if (existingUser.active) {
          return NextResponse.json(
            {
              message:
                "Password added to your account. You can now login with email and password.",
              userId: existingUser.id,
              requiresVerification: false,
            },
            { status: 200 },
          );
        }

        // If not active, send verification email
        const emailResult = await sendVerificationEmail(
          email,
          name,
          existingUser.id,
        );

        if (!emailResult.success) {
          return NextResponse.json(
            {
              message: "Password added but failed to send verification email.",
              userId: existingUser.id,
            },
            { status: 500 },
          );
        }

        return NextResponse.json(
          {
            message: "Password added. Please verify your email.",
            userId: existingUser.id,
            requiresVerification: true,
          },
          { status: 200 },
        );
      }

      // User exists but scenario not handled
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
    }

    // New user - create account
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        active: false,
      },
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(email, name, user.id);

    if (!emailResult.success) {
      console.error("Failed to send verification email:", emailResult.error);

      return NextResponse.json(
        {
          message:
            "Account created but failed to send verification email. Please contact support.",
          userId: user.id,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message:
          "Account created successfully. Please check your email for verification code.",
        userId: user.id,
        requiresVerification: true,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

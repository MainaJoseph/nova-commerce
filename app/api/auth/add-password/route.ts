import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/actions/sendVerificationEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "No account found with this email. Please sign up first." },
        { status: 404 },
      );
    }

    // Check if user already has a password
    if (existingUser.hashedPassword) {
      return NextResponse.json(
        { message: "This account already has a password set. Please login." },
        { status: 400 },
      );
    }

    // Check if user has OAuth accounts
    const hasOAuthOnly = existingUser.accounts.length > 0;

    if (!hasOAuthOnly) {
      return NextResponse.json(
        { message: "Invalid account state. Please contact support." },
        { status: 400 },
      );
    }

    // User exists with OAuth only - add password to their account
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        hashedPassword,
        name: name || existingUser.name,
        // Set active to false - require verification
        active: false,
      },
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(
      email,
      name || existingUser.name || "User",
      existingUser.id,
    );

    if (!emailResult.success) {
      console.error("Failed to send verification email:", emailResult.error);
      return NextResponse.json(
        {
          message: "Password added but failed to send verification email.",
          userId: existingUser.id,
          requiresVerification: false,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message:
          "Password added successfully. Please verify your email to enable password login.",
        userId: existingUser.id,
        requiresVerification: true,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Add password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, year, college, skills, availability, linkedinURL } = body;

    // Check if user exists first
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user with new data
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        year,
        college,
        skills,
        availability,
        linkedinURL,
        isOnboarded: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

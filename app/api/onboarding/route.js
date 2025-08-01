import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, year, college, skills, availability, linkedinURL } = body;

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
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

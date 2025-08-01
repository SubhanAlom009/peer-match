// app/api/matches/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const potentialMatches = await prisma.User.findMany({
      where: {
        id: { not: userId },
        year: currentUser.year,
        college: currentUser.college,
        skills: {
          hasSome: currentUser.skills,
        },
      },
    });

    return NextResponse.json({ matches: potentialMatches }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

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

    // Get all users except current user who have completed onboarding
    const allUsers = await prisma.user.findMany({
      where: {
        id: { not: userId },
        isOnboarded: true,
        // Basic filters - at least have some profile data
        AND: [
          { year: { not: null } },
          { college: { not: null } },
          { skills: { isEmpty: false } },
        ],
      },
    });

    // Calculate match percentage for each user
    const matchesWithScores = allUsers.map((user) => {
      let matchScore = 0;
      let totalFactors = 0;

      // Factor 1: Same college (30% weight)
      totalFactors += 30;
      if (user.college === currentUser.college) {
        matchScore += 30;
      }

      // Factor 2: Same year (25% weight)
      totalFactors += 25;
      if (user.year === currentUser.year) {
        matchScore += 25;
      }

      // Factor 3: Similar skills (35% weight)
      totalFactors += 35;
      if (
        currentUser.skills &&
        currentUser.skills.length > 0 &&
        user.skills &&
        user.skills.length > 0
      ) {
        const currentUserSkills = currentUser.skills.map((skill) =>
          skill.toLowerCase()
        );
        const userSkills = user.skills.map((skill) => skill.toLowerCase());

        const commonSkills = currentUserSkills.filter((skill) =>
          userSkills.some(
            (userSkill) =>
              userSkill.includes(skill) || skill.includes(userSkill)
          )
        );

        const skillMatchPercentage =
          (commonSkills.length /
            Math.max(currentUserSkills.length, userSkills.length)) *
          100;
        matchScore += (skillMatchPercentage / 100) * 35;
      }

      // Factor 4: Similar availability (10% weight)
      totalFactors += 10;
      if (user.availability && currentUser.availability) {
        const currentAvailability = currentUser.availability.toLowerCase();
        const userAvailability = user.availability.toLowerCase();

        // Check for common time patterns
        const timeKeywords = [
          "morning",
          "afternoon",
          "evening",
          "night",
          "weekend",
          "weekday",
        ];
        const commonTimePatterns = timeKeywords.filter(
          (keyword) =>
            currentAvailability.includes(keyword) &&
            userAvailability.includes(keyword)
        );

        if (commonTimePatterns.length > 0) {
          matchScore += 10;
        }
      }

      const finalMatchPercentage = Math.round(
        (matchScore / totalFactors) * 100
      );

      return {
        ...user,
        matchPercentage: finalMatchPercentage,
      };
    });

    // Filter users with at least 15% match and sort by match percentage
    const filteredMatches = matchesWithScores
      .filter((user) => user.matchPercentage >= 15) // Very low threshold - show almost everyone
      .sort((a, b) => b.matchPercentage - a.matchPercentage) // Sort by highest match first
      .slice(0, 20); // Limit to top 20 matches

    return NextResponse.json({ matches: filteredMatches }, { status: 200 });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

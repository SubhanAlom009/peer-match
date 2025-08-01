"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios from "axios";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${session.user.id}`);
        setUserProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-muted-foreground">{session.user.email}</p>
          <p className="text-sm text-green-600">
            ✓ Profile {userProfile?.isOnboarded ? "Complete" : "Incomplete"}
          </p>
        </div>
        <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline">
          Sign Out
        </Button>
      </div>

      {/* Profile Summary */}
      {userProfile && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">College</h4>
                <p className="text-muted-foreground">
                  {userProfile.college || "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Year</h4>
                <p className="text-muted-foreground">
                  {userProfile.year || "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Availability</h4>
                <p className="text-muted-foreground">
                  {userProfile.availability || "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">LinkedIn</h4>
                {userProfile.linkedinURL ? (
                  <a
                    href={userProfile.linkedinURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                ) : (
                  <p className="text-muted-foreground">Not specified</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills && userProfile.skills.length > 0 ? (
                  userProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No skills added</p>
                )}
              </div>
            </div>

            <Button asChild>
              <Link href="/onboarding">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Find Study Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Discover peers who share your interests and schedule.
            </p>
            <Button asChild className="w-full">
              <Link href="/matches">View Matches</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your existing study partnerships.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/connections">View Connections</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Join or create study groups for collaborative learning.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/groups">Browse Groups</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

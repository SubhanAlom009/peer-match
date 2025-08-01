"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function MatchesPage() {
  const { data: session } = useSession();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await axios.post("/api/matches", {
        userId: session.user.id,
      });
      setMatches(response.data.matches || []);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      toast.error("Something went wrong while fetching matches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchMatches();
    }
  }, [session]);

  if (!session) {
    return <div>Please sign in first</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <Card key={idx}>
              <CardHeader>
                <Skeleton className="h-5 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-lg text-muted-foreground">No matches found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {matches.map((match) => (
            <Card key={match.id}>
              <CardHeader>
                <CardTitle>{match.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {match.college} — {match.year}
                </p>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Skills:</strong> {match.skills.join(", ")}
                </p>
                <p>
                  <strong>Availability:</strong> {match.availability}
                </p>
                <Link
                  href={match.linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4 w-full">Ping on LinkedIn</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

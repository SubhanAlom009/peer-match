"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ExternalLink,
  Users,
  Heart,
  Star,
  Clock,
  Globe,
  Zap,
  CheckCircle,
  Plus,
  Sparkles,
  Check,
  Handshake,
  Network,
  Target,
} from "lucide-react";

export default function MatchesPage() {
  const { data: session } = useSession();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectingIds, setConnectingIds] = useState(new Set());
  const [connectedIds, setConnectedIds] = useState(new Set());

  const fetchMatches = async () => {
    if (!session?.user?.id) return;

    try {
      // Fetch matches
      const matchesResponse = await axios.post("/api/matches", {
        userId: session.user.id,
      });

      // Fetch existing connections to know which users are already connected
      const connectionsResponse = await axios.get(
        `/api/connections?userId=${session.user.id}`
      );

      const matches = matchesResponse.data.matches || [];
      const connections = connectionsResponse.data.connections || [];

      // Create a set of connected user IDs
      const connectedUserIds = new Set(connections.map((conn) => conn.user.id));

      setMatches(matches);
      setConnectedIds(connectedUserIds);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      toast.error("Something went wrong while fetching matches.");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (matchId, matchName) => {
    setConnectingIds((prev) => new Set([...prev, matchId]));

    try {
      // API call to add connection
      await axios.post("/api/connections", {
        userId: session.user.id,
        connectToId: matchId,
      });

      toast.success(`Connected with ${matchName}! 🎉`);

      // Add to connected IDs instead of removing from matches
      setConnectedIds((prev) => new Set([...prev, matchId]));
    } catch (error) {
      console.error("Failed to connect:", error);
      toast.error("Failed to connect. Please try again.");
    } finally {
      setConnectingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(matchId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    if (session) {
      fetchMatches();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please sign in to view your matches
            </p>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="relative overflow-hidden py-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Badge
                variant="outline"
                className="px-4 py-2 bg-white/80 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Perfect Collaboration Matches
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Your Collaboration Buddies
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing collaboration partners who share your interests,
              skills, and professional goals for networking and project building
            </p>
          </div>
        </div>
      </section>

      {/* Matches Content */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, idx) => (
                <Card key={idx} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-10 bg-gray-200 rounded mt-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-20">
              <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Collaboration Matches Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Complete your profile to find compatible collaboration
                    buddies and start building your professional network
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    <Link href="/onboarding">Complete Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Found {matches.length} Perfect Collaboration Matches
                  </h2>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {connectedIds.size} Connected
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      {matches.length - connectedIds.size} Available
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match, index) => {
                  const isConnected = connectedIds.has(match.id);
                  const isConnecting = connectingIds.has(match.id);

                  return (
                    <Card
                      key={match.id}
                      className={`group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden ${
                        isConnected ? "ring-2 ring-green-200" : ""
                      }`}
                    >
                      {/* Match Score Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        {isConnected ? (
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <Check className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            {match.matchPercentage || 85 + index * 3}% Match
                          </Badge>
                        )}
                      </div>

                      {/* Decorative Elements */}
                      <div
                        className={`absolute top-0 left-0 w-full h-2 ${
                          isConnected
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        }`}
                      ></div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                      <CardHeader className="relative z-10 pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                              {match.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Globe className="w-4 h-4" />
                              <span>{match.college}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{match.year}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative z-10 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <h4 className="font-medium text-gray-900">
                              Skills & Interests
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {match.skills?.slice(0, 4).map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {match.skills?.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{match.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-green-500" />
                            <h4 className="font-medium text-gray-900">
                              Availability
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                            {match.availability}
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          {isConnected ? (
                            <Button
                              disabled
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white cursor-default"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Connected
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleConnect(match.id, match.name)
                              }
                              disabled={isConnecting}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              {isConnecting ? (
                                <div className="flex items-center">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Connecting...
                                </div>
                              ) : (
                                <>
                                  <Handshake className="w-4 h-4 mr-2" />
                                  Connect
                                </>
                              )}
                            </Button>
                          )}

                          {match.linkedinURL && (
                            <Button
                              asChild
                              variant="outline"
                              className="hover:bg-blue-50 border-blue-200"
                            >
                              <Link
                                href={match.linkedinURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

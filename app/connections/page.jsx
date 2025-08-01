"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios from "axios";
import {
  ExternalLink,
  Users,
  Heart,
  Clock,
  Globe,
  Zap,
  UserX,
  Calendar,
} from "lucide-react";

export default function Connections() {
  const { data: session } = useSession();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState(new Set());

  const fetchConnections = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await axios.get(
        `/api/connections?userId=${session.user.id}`
      );
      setConnections(response.data.connections || []);
    } catch (error) {
      console.error("Failed to fetch connections:", error);
      toast.error("Failed to load connections");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveConnection = async (connectionId, userName) => {
    setRemovingIds((prev) => new Set([...prev, connectionId]));

    try {
      await axios.delete(
        `/api/connections?connectionId=${connectionId}&userId=${session.user.id}`
      );
      toast.success(`Removed ${userName} from connections`);

      // Remove from local state
      setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
    } catch (error) {
      console.error("Failed to remove connection:", error);
      toast.error("Failed to remove connection");
    } finally {
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  useEffect(() => {
    if (session) {
      fetchConnections();
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
              Please sign in to view your connections
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
                <Heart className="w-4 h-4 mr-2 text-pink-500" />
                Your Network
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Your Connections
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your study partnerships and continue collaborating with
              amazing peers
            </p>
          </div>
        </div>
      </section>

      {/* Connections Content */}
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
          ) : connections.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Study Partners ({connections.length})
                  </h2>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Link href="/matches">
                      <Users className="w-4 h-4 mr-2" />
                      Find More Partners
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {connections.map((connection) => (
                  <Card
                    key={connection.id}
                    className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-gray-300"
                  >
                    {/* Simple top border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {connection.user.name}
                      </CardTitle>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="w-4 h-4" />
                          <span>
                            {connection.user.college || "College not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {connection.user.year || "Year not specified"}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Skills */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <h4 className="font-medium text-gray-900 text-sm">
                            Skills
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {connection.user.skills
                            ?.slice(0, 3)
                            .map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          {connection.user.skills?.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-gray-100 text-gray-700"
                            >
                              +{connection.user.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Connected since */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <h4 className="font-medium text-gray-900 text-sm">
                            Connected
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(connection.connectedSince)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {connection.user.linkedinURL && (
                          <Button
                            asChild
                            variant="outline"
                            className="flex-1 hover:bg-blue-50 border-blue-200 text-blue-600"
                          >
                            <Link
                              href={connection.user.linkedinURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              LinkedIn
                            </Link>
                          </Button>
                        )}

                        <Button
                          onClick={() =>
                            handleRemoveConnection(
                              connection.id,
                              connection.user.name
                            )
                          }
                          disabled={removingIds.has(connection.id)}
                          variant="outline"
                          className="hover:bg-red-50 border-red-200 text-red-600"
                        >
                          {removingIds.has(connection.id) ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <UserX className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Card className="max-w-md mx-auto bg-white shadow-lg border border-gray-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Connections Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start connecting with study partners to build your network
                    and accelerate your learning!
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Link href="/matches">
                      <Users className="w-4 h-4 mr-2" />
                      Find Study Partners
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

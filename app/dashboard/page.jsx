"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios from "axios";
import {
  Users,
  Target,
  Calendar,
  ExternalLink,
  Edit,
  Network,
  Award,
  Globe,
  Heart,
  Zap,
  CheckCircle,
  Clock,
  UserPlus,
  Handshake,
} from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // Fetch user profile data and connections
    const fetchData = async () => {
      try {
        const [profileResponse, connectionsResponse] = await Promise.all([
          axios.get(`/api/user/${session.user.id}`),
          axios.get(`/api/connections?userId=${session.user.id}`),
        ]);

        setUserProfile(profileResponse.data.user);
        setConnections(connectionsResponse.data.connections || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-lg font-medium text-gray-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const profileCompletion = userProfile
    ? (((userProfile.year ? 1 : 0) +
        (userProfile.college ? 1 : 0) +
        (userProfile.skills?.length > 0 ? 1 : 0) +
        (userProfile.availability ? 1 : 0) +
        (userProfile.linkedinURL ? 1 : 0)) /
        5) *
      100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="relative overflow-hidden py-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Badge
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm"
                >
                  ✨ Welcome back!
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Hey, {session.user.name}! 👋
              </h1>

              <p className="text-xl text-gray-600 mb-4">
                Ready to expand your professional network and find collaboration
                partners?
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last active: Just now</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Profile {Math.round(profileCompletion)}% complete</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="outline"
                className="hover:bg-gray-50 transition-all duration-300"
              >
                Sign Out
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/matches">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Find Buddies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview - Only 2 cards now */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="relative overflow-hidden group bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardContent className="p-8 relative z-10 text-center">
                <Network className="w-10 h-10 mb-3 opacity-80 mx-auto" />
                <div className="text-3xl font-bold mb-1">
                  {connections.length}
                </div>
                <div className="text-sm opacity-90">Network Connections</div>
                <p className="text-xs opacity-75 mt-2">
                  {connections.length === 0
                    ? "Start building your professional network!"
                    : `Connected with ${
                        connections.length
                      } amazing collaboration ${
                        connections.length === 1 ? "buddy" : "buddies"
                      }`}
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardContent className="p-8 relative z-10 text-center">
                <Target className="w-10 h-10 mb-3 opacity-80 mx-auto" />
                <div className="text-3xl font-bold mb-1">
                  {Math.round(profileCompletion)}%
                </div>
                <div className="text-sm opacity-90">Profile Complete</div>
                <p className="text-xs opacity-75 mt-2">
                  {profileCompletion === 100
                    ? "Your profile is complete!"
                    : `${
                        5 - Math.ceil(profileCompletion / 20)
                      } more fields to complete`}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      {userProfile && (
        <section className="py-8 px-6">
          <div className="container mx-auto">
            <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      Your Professional Profile
                      <Award className="w-6 h-6 text-yellow-500" />
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Complete your profile to get better collaboration matches
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="hover:bg-gray-50 transition-all duration-300"
                  >
                    <Link href="/onboarding">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Profile Completion
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(profileCompletion)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium text-gray-900">
                        College/University
                      </h4>
                    </div>
                    <p className="text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      {userProfile.college || "Not specified"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <h4 className="font-medium text-gray-900">
                        Academic Year
                      </h4>
                    </div>
                    <p className="text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      {userProfile.year || "Not specified"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <h4 className="font-medium text-gray-900">
                        Availability
                      </h4>
                    </div>
                    <p className="text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      {userProfile.availability || "Not specified"}
                    </p>
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <h4 className="font-medium text-gray-900">
                        Skills & Interests
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills && userProfile.skills.length > 0 ? (
                        userProfile.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 hover:from-blue-200 hover:to-purple-200 transition-all duration-300"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          No skills/interests added yet
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium text-gray-900">
                        LinkedIn Profile
                      </h4>
                    </div>
                    {userProfile.linkedinURL ? (
                      <a
                        href={userProfile.linkedinURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 transition-all duration-300"
                      >
                        View Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-gray-500 italic bg-gray-50 rounded-lg px-3 py-2">
                        Not specified
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="py-8 px-6 mb-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-gray-600">
              Connect with collaboration buddies and grow your professional
              network
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>

              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Find Collaboration Buddies
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-gray-600 mb-4">
                  Discover peers who share your interests and goals. Get matched
                  with compatible collaboration partners based on your profile
                  and skills.
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Link href="/matches">
                    <Target className="w-4 h-4 mr-2" />
                    View Matches
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>

              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Your Network
                  {connections.length > 0 && (
                    <Badge className="ml-2 bg-purple-100 text-purple-700">
                      {connections.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-gray-600 mb-4">
                  {connections.length === 0
                    ? "Start building your professional network by connecting with matched collaboration partners."
                    : `Manage your ${connections.length} professional connections and continue collaborating with your network buddies.`}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:bg-purple-50 border-purple-200"
                >
                  <Link href="/connections">
                    <Heart className="w-4 h-4 mr-2" />
                    {connections.length === 0
                      ? "Start Networking"
                      : "View Connections"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

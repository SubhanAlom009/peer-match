"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Users,
  Calendar,
  GraduationCap,
  Code,
  Clock,
  ExternalLink,
  User,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    year: "",
    college: "",
    skills: "",
    availability: "",
    linkedinURL: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const router = useRouter();

  // Fetch existing profile data
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${session.user.id}`);
        const user = response.data.user;

        if (user) {
          setForm({
            year: user.year || "",
            college: user.college || "",
            skills: user.skills ? user.skills.join(", ") : "",
            availability: user.availability || "",
            linkedinURL: user.linkedinURL || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setFetchingProfile(false);
      }
    };

    fetchProfile();
  }, [session, status, router]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    setLoading(true);

    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
      userId: session.user.id,
    };

    try {
      const response = await axios.post("/api/onboarding", payload);
      if (response.status === 201 || response.status === 200) {
        toast.success("Profile updated successfully! 🎉");

        // If user already has profile data, redirect to dashboard
        // If it's first time setup, redirect to dashboard too
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || fetchingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-lg font-medium text-gray-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please sign in to complete your profile
            </p>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if this is an update (user has existing profile data) or first-time setup
  const isUpdating = form.college || form.year || form.skills;
  const hasCompletedOnboarding = session.user.isOnboarded;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Back button for users updating profile */}
            {hasCompletedOnboarding && (
              <div className="flex justify-start mb-4">
                <Button
                  asChild
                  variant="ghost"
                  className="hover:bg-white/50 transition-all duration-300"
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </div>
            )}

            <div className="flex justify-center mb-4">
              <Badge
                variant="outline"
                className="px-4 py-2 bg-white/80 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isUpdating ? "Update Profile" : "Getting Started"}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {isUpdating ? "Update Your Profile" : "Complete Your Profile"}
            </h1>

            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              {isUpdating
                ? "Keep your information up to date to get better matches"
                : "Tell us about yourself to find the perfect study partners"}
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 relative overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-500" />
                Profile Information
              </CardTitle>
              <p className="text-gray-600">
                This information helps us match you with compatible study
                partners
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name (disabled) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    value={session.user.name}
                    disabled
                    className="bg-gray-50 h-12"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Academic Year */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="year"
                      className="text-gray-700 font-medium flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-purple-500" />
                      Academic Year
                    </Label>
                    <Input
                      id="year"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 2nd Year, Final Year"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>

                  {/* College */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="college"
                      className="text-gray-700 font-medium flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      College/University
                    </Label>
                    <Input
                      id="college"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      required
                      placeholder="e.g., MIT, Stanford University"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label
                    htmlFor="skills"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <Code className="w-4 h-4 text-green-500" />
                    Skills & Technologies
                  </Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="e.g., React, Node.js, Python, Machine Learning, Data Structures"
                    required
                    className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    Separate multiple skills with commas
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Availability */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="availability"
                      className="text-gray-700 font-medium flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-orange-500" />
                      Availability
                    </Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Weekends, Evenings, 2-4 PM daily"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedinURL"
                      className="text-gray-700 font-medium flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      LinkedIn Profile (Optional)
                    </Label>
                    <Input
                      id="linkedinURL"
                      name="linkedinURL"
                      value={form.linkedinURL}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        {isUpdating ? "Updating..." : "Completing..."}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-3" />
                        {isUpdating
                          ? "Update Profile"
                          : "Complete Profile & Find Matches"}
                        <ArrowRight className="w-5 h-5 ml-3" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

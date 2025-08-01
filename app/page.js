"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Target,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Brain,
  Heart,
  Lightbulb,
  Network,
  Handshake,
} from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm"
            >
              🤝 Find Your Perfect Collaboration Buddy
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            Connect. Collaborate.
            <br className="hidden md:block" />
            <span className="relative">
              Create
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students and professionals who found their ideal
            collaboration partners, built meaningful networks, and achieved
            success together through shared interests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {session ? (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/auth/signup">
                    Start Networking
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg rounded-full border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          <div className="mt-12 flex justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>10,000+ Active Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>200+ Universities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How PeerMatch Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent matching system connects you with like-minded
              peers based on your skills, interests, and collaboration goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Create Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 mb-4">
                  Share your skills, interests, availability, and collaboration
                  goals. Connect your LinkedIn for professional networking!
                </p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <span>2 minutes setup</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Get Smart Matches
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 mb-4">
                  Our AI algorithm analyzes compatibility across interests,
                  skills, and goals to find your perfect collaboration buddies.
                </p>
                <div className="flex items-center text-sm text-purple-600 font-medium">
                  <span>95% compatibility rate</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Start Collaborating
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 mb-4">
                  Connect on LinkedIn, start projects together, share ideas, and
                  build meaningful professional relationships.
                </p>
                <div className="flex items-center text-sm text-pink-600 font-medium">
                  <span>Connect professionally</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200"
              >
                ✨ Why Choose PeerMatch
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Your
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  {" "}
                  Professional Network
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Research shows that strong professional networks lead to 23%
                better career opportunities and more innovative collaborations.
              </p>

              <div className="space-y-4">
                {[
                  "Find collaboration partners with complementary skills",
                  "Build meaningful professional relationships",
                  "Share ideas and resources effectively",
                  "Expand your network across universities",
                  "Discover new opportunities through connections",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-6 text-center">
                    <Network className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm opacity-90">
                      Find project partners
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 mt-8">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm opacity-90">Connections made</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 -mt-4">
                  <CardContent className="p-6 text-center">
                    <Lightbulb className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">
                      Collaboration projects
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm opacity-90">Average rating</div>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Members Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from students and professionals who found their
              perfect collaboration partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Computer Science, Stanford",
                content:
                  "PeerMatch helped me find amazing project partners! We built an app together that landed us internships at top tech companies.",
                rating: 5,
              },
              {
                name: "Alex Rodriguez",
                role: "Engineering, MIT",
                content:
                  "I've made lifelong professional connections through PeerMatch. We still collaborate on startups and side projects!",
                rating: 5,
              },
              {
                name: "Emily Johnson",
                role: "Business, Harvard",
                content:
                  "The LinkedIn integration is perfect. Found my co-founder through PeerMatch and we're building something amazing together!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    {testimonial.content}
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Find Your
            <br />
            Perfect Collaboration Buddy?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who are already
            networking, collaborating, and building the future together.
          </p>

          {!session && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/signup">
                  Start Networking Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          )}

          <div className="mt-8 text-white/80 text-sm">
            Free to join • No credit card required • Start connecting in 2
            minutes
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PeerMatch
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Connecting students and professionals worldwide for meaningful
            collaborations.
          </p>
          <div className="text-sm text-gray-500">
            © 2025 PeerMatch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

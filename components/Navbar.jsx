"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Heart,
  Settings,
  LogOut,
  Home,
  Target,
  User,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
              PeerMatch
            </h1>
          </Link>

          {/* Navigation Links & User Menu */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    asChild
                    className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                  >
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    asChild
                    className="hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
                  >
                    <Link href="/matches" className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Matches
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    asChild
                    className="hover:bg-pink-50 hover:text-pink-600 transition-all duration-300"
                  >
                    <Link
                      href="/connections"
                      className="flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Connections
                    </Link>
                  </Button>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-gray-50 transition-all duration-300 p-2 rounded-full"
                    >
                      <Avatar className="h-8 w-8 border-2 border-gradient-to-r from-blue-500 to-purple-500">
                        <AvatarImage src={session.user.image} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                          {session.user.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:flex items-center gap-1">
                        <span className="font-medium text-gray-700">
                          {session.user.name?.split(" ")[0]}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl"
                  >
                    <div className="p-2">
                      <div className="flex items-center gap-2 p-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session.user.image} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {session.user.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {session.user.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Mobile Navigation Links */}
                    <div className="md:hidden">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 w-full"
                        >
                          <Home className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/matches"
                          className="flex items-center gap-2 w-full"
                        >
                          <Target className="w-4 h-4" />
                          Matches
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/connections"
                          className="flex items-center gap-2 w-full"
                        >
                          <Heart className="w-4 h-4" />
                          Connections
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>

                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center gap-2 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Guest Navigation */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    asChild
                    className="hover:bg-gray-50 transition-all duration-300"
                  >
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

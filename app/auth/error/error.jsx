"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const messages = {
  Configuration: "Auth configuration error. Contact support.",
  AccessDenied: "Access denied for this account.",
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "Could not start OAuth flow.",
  OAuthCallback: "OAuth callback failed. Try again.",
  OAuthCreateAccount: "Could not create OAuth account.",
  OAuthAccountNotLinked: "Use the original provider you signed up with.",
  EmailSignin: "Email sign-in failed.",
  EmailCreateAccount: "Could not create email account.",
  SessionRequired: "Please sign in to continue.",
  Default: "Something went wrong. Please try again.",
};

function friendly(code) {
  return messages[code] || messages.Default;
}

export default function AuthErrorPage() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("error") || "Default";
  const msg = friendly(code);

  // Optional: auto-redirect after a delay (e.g. for SessionRequired)
  useEffect(() => {
    if (code === "SessionRequired") {
      const t = setTimeout(() => router.replace("/auth/signin"), 2500);
      return () => clearTimeout(t);
    }
  }, [code, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-red-100">
        <div className="mb-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            Authentication Error
          </h1>
          <p className="text-sm text-gray-500 mt-2">{msg}</p>
          {code !== "Default" && (
            <p className="text-[11px] text-gray-400 mt-1 tracking-wide">
              Code: {code}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full text-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition"
          >
            Back to Sign In
          </Link>
          <button
            onClick={() => router.back()}
            className="w-full text-center rounded-md border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Go Back
          </button>
        </div>

        <p className="text-[11px] text-gray-400 text-center mt-6">
          If this keeps happening, verify your OAuth keys & redirect URI.
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-br from-[#fffff4] to-[#f0f8ff] font-text px-4 py-8">
      <div className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-300 bg-white/80 backdrop-blur-sm border border-white/20">
        {/* Header Section */}
        <div className="text-center pt-8 pb-4">
          <h1 className="font-bold text-2xl md:text-3xl text-[#365666] mb-4">
            Welcome Back
          </h1>
          <p className="text-xs text-[#365666] font-medium px-6 leading-relaxed">
            Sign in to your health hub, where your well-being is our priority!
          </p>
        </div>

        {/* Clerk SignIn Component */}
        <div className="flex justify-center px-4 py-1">
          <SignIn
            afterSignInUrl="/predict"
            signUpUrl="/signup"
            appearance={{
              elements: {
                formButtonPrimary: "bg-[#93C6E7] hover:bg-[#a6cee9] transition duration-300 rounded-md",
                card: "bg-white  rounded-xl p-6",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formFieldInput: "border border-gray-300 focus:border-[#93C6E7] focus:ring-2 focus:ring-[#93C6E7]/50 rounded-md px-3 py-2 transition",
                footerActionLink: "text-[#93C6E7] hover:text-[#7bb3d9] font-semibold",
                identityPreviewText: "text-gray-600",
                formFieldLabel: "text-gray-700 font-medium",
              },
            }}
          />
        </div>

        {/* Footer Link */}
        <div className="flex justify-center text-[#365666] pb-8 px-6">
          <p className="text-center text-sm">
            New to our platform?{" "}
            <Link to="/signup" className="group">
              <span className="text-[#a4cfeb] hover:text-[#7bb3d9] font-semibold transition-colors duration-200 group-hover:underline">
                Create Account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
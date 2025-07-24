import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-br from-[#fffff4] to-[#f0f8ff] font-text px-4 ">
      <div className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-300 bg-black/20 backdrop-blur-sm border border-white/20">
        {/* Header Section */}
        <div className="text-center pt-8 pb-2">
          <h1 className="font-bold text-2xl md:text-3xl text-[#325465] mb-1">
            Join Us Today
          </h1>
          <p className="text-xs text-gray-600 font-medium px-6 leading-relaxed">
            Join AI-Disease Predictor for personalized wellness insights.
            <br />
            <span className="text-[#0099ff] font-bold text-lg">Register in just one click!</span>
          </p>
        </div>

        {/* Clerk SignUp Component */}
        <div className="flex justify-center px-6 ">
          <SignUp 
            afterSignUpUrl="/predict"
            signInUrl="/login"
            appearance={{
              elements: {
                formButtonPrimary: "bg-gradient-to-r from-[#93C6E7] to-[#7bb3d9] hover:from-[#7bb3d9] hover:to-[#6ba3d0]  transition-all duration-300 transform hover:scale-105 ",
                card: "bg-transparent shadow-none border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formFieldInput: "border-gray-200 focus:border-[#93C6E7] focus:ring-[#93C6E7]/20 rounded-lg transition-colors duration-200",
                footerActionLink: "text-[#93C6E7] hover:text-[#7bb3d9] font-medium",
                identityPreviewText: "text-gray-700",
                formFieldLabel: "text-gray-700 font-medium",
                formFieldSuccessText: "text-green-600",
                formFieldErrorText: "text-red-500"
              }
            }}
          />
        </div>

        {/* Footer Link */}
        <div className="flex justify-center text-gray-600 py-4 px-6">
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="group">
              <span className="text-[#0099ff] hover:text-[#0e151a] font-semibold transition-colors duration-200 group-hover:underline">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
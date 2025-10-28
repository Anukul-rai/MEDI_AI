import React from "react";
import { useSignIn } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

export default function Login() {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const handlePopupOAuth = async (provider) => {
  try {
    await signIn.authenticateWithRedirect({
      strategy: provider,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/Homepage",
    });
  } catch (err) {
    console.error("OAuth redirect error:", err);
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#c1abab] to-[#10375a] font-text px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 space-y-6 border border-white/30">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1d1d22] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#279cd6] font-medium">
            Sign in to your health hub, where your well-being is our priority!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handlePopupOAuth("oauth_google")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg py-2 transition duration-200"
          >
            <FcGoogle size={20} />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <button
            onClick={() => handlePopupOAuth("oauth_apple")}
            className="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 hover:bg-gray-900 transition duration-200"
          >
            <FaApple size={20} />
            <span className="font-medium">Continue with Apple</span>
          </button>
          <button
            onClick={() => handlePopupOAuth("oauth_facebook")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg py-2 transition duration-200"
          >
            <FaFacebook size={20} color="blue"/>
            <span className="font-medium">Continue with Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#365666] font-semibold">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#0e96f1] font-semibold hover:text-[#7bb3d9] transition"
          >
            Sign Up!
          </a>
        </div>
      </div>
    </div>
  );
}

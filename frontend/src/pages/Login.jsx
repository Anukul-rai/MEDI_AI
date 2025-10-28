import React, { useState } from "react";
import { useSignIn, useClerk } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa6";

export default function Login() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { navigate } = useClerk();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) return null;

  const handleEmailLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // Start sign in
    const signInResult = await signIn.create({
      identifier: form.email,
      password: form.password,
    });

    if (signInResult.status === "complete") {
      // Activate the session to log the user in
      await setActive({ session: signInResult.createdSessionId });
      window.location.href = "/Homepage"; // redirect after login
    } else if (signInResult.status === "needs_email_verification") {
      setError("Please verify your email before logging in.");
    } else {
      setError("Unexpected sign-in state. Please try again.");
      console.log(signInResult);
    }
  } catch (err) {
    console.error("Login error:", err.errors?.[0]?.message || err.message);
    setError("Invalid email or password. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // Handle OAuth login
  const handleOAuth = async (provider) => {
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
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#c1abab] to-[#10375a] font-text px-4 py-15">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-lg shadow-gray-300 rounded-2xl p-8 space-y-6 border border-white/30">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1d1d22] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#279cd6] font-medium">
            Sign in to your health hub, where your well-being is our priority!
          </p>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/90 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#279cd6]/40 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white/90 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#279cd6]/40 focus:outline-none"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0699e2] hover:bg-[#1b7fb0]"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-20 bg-gray-300"></span>
          <span className="text-gray-500 text-sm">or continue with</span>
          <span className="h-px w-20 bg-gray-300"></span>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth("oauth_google")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg py-2 transition duration-200"
          >
            <FcGoogle size={20} />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <button
            onClick={() => handleOAuth("oauth_apple")}
            className="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 hover:bg-gray-900 transition duration-200"
          >
            <FaApple size={20} />
            <span className="font-medium">Continue with Apple</span>
          </button>

          <button
            onClick={() => handleOAuth("oauth_facebook")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg py-2 transition duration-200"
          >
            <FaFacebook size={20} color="blue" />
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

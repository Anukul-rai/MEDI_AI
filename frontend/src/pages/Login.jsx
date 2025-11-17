import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa6";

export default function LoginPage() {
  const { loginWithRedirect, isAuthenticated, isLoading, user, error } = useAuth0();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Email/password login (optional with Auth0, usually OAuth is preferred)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      // Handle login with Auth0's Universal Login page
      await loginWithRedirect({
        login_hint: form.email,
      });
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // OAuth login (Google, Apple, Facebook)
  const handleOAuth = async (provider) => {
    setLoginError("");
    try {
      // Trigger OAuth login redirect
      await loginWithRedirect({
        connection: provider, // Google, Apple, Facebook, etc.
      });
    } catch (err) {
      console.error("OAuth login error:", err);
      setLoginError("OAuth login failed. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>; // Show loading state while Auth0 is determining authentication status

  return (
    <div className="flex flex-col justify-center items-center bg-indigo-100 font-text px-4 py-16 min-h-screen">
      <div className="w-full max-w-md bg-[#365666] backdrop-blur-sm shadow-lg rounded-2xl p-8 space-y-6 border border-white/30">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#ffffff] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#ffffff] font-medium">Sign in to your health hub!</p>
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

          {loginError && <p className="text-red-500 text-sm text-center font-medium">{loginError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0699e2] hover:bg-[#1b7fb0]"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-20 bg-gray-300"></span>
          <span className="text-gray-100 text-sm">or continue with</span>
          <span className="h-px w-20 bg-gray-300"></span>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg py-2 transition duration-200"
          >
            <FcGoogle size={20} />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <button
            onClick={() => handleOAuth("apple")}
            className="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 hover:bg-gray-900 transition duration-200"
          >
            <FaApple size={20} />
            <span className="font-medium">Continue with Apple</span>
          </button>

          <button
            onClick={() => handleOAuth("facebook")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg py-2 transition duration-200"
          >
            <FaFacebook size={20} color="blue" />
            <span className="font-medium">Continue with Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#ffffff] font-semibold">
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

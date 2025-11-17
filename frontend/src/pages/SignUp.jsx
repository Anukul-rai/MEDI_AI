import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Importing the Auth0 hook
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";

function Signup() {
  const { loginWithRedirect, isAuthenticated, isLoading, user, error } = useAuth0();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle manual email/password signup using Auth0's Universal Login
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignUpError("");

    try {
      // Trigger the Auth0 Universal Login (this is the signup and login page provided by Auth0)
      await loginWithRedirect({
        screen_hint: "signup", // This tells Auth0 to show the signup form by default
        login_hint: form.email, // Pre-fill the email address
      });
    } catch (err) {
      console.error("Signup error:", err);
      setSignUpError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // OAuth login with Google / Apple
  const handleOAuthSignup = async (provider) => {
    try {
      await loginWithRedirect({
        connection: provider, // Specify the provider (google, apple)
      });
    } catch (err) {
      console.error("OAuth signup error:", err);
    }
  };

  // If the user is authenticated, we redirect to another page
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center w-full bg-indigo-100 font-text px-4">
        <div className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-300 bg-white/70 backdrop-blur-md border border-white/30 p-8 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#325465] mb-2">Account Created!</h2>
            <p className="text-gray-600">You are now signed in!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full bg-indigo-100 font-text px-4 py-25">
      <div className="w-full max-w-md rounded-2xl backdrop-blur-sm shadow-lg shadow-gray-300 bg-[#365666] border border-white/30 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-3xl text-[#f2f2f9] mb-2">Join Us Today</h1>
          <p className="text-sm text-[#f0f3f4] font-medium">
            Create your account to start your personalized wellness journey.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleOAuthSignup("apple")}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-transform duration-200 hover:scale-105"
          >
            <FaApple size={18} />
            Apple
          </button>
          <button
            onClick={() => handleOAuthSignup("google")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-transform duration-200 hover:scale-105"
          >
            <FaGoogle size={18} className="text-red-500" />
            Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-100 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C6E7]/50 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-100 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C6E7]/50 transition"
              placeholder="Enter your password"
            />
          </div>

          {signUpError && <p className="text-red-500 text-sm text-center">{signUpError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0699e2] hover:bg-[#1b7fb0]"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-100 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0099ff] hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

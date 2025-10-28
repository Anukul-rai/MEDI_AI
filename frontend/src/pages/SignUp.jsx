import React, { useState } from "react";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";

function Signup() {
  const { signUp, isLoaded } = useSignUp();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isLoaded) return null;

  // Handle email/password signup WITHOUT auto-login
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create the user account
      const result = await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Check if sign-up is complete
      if (result.status === "complete") {
        // IMPORTANT: Sign out immediately to prevent auto-login
        await signOut();
        
        // Show success message
        setSuccess(true);
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.log("Sign-up status:", result.status);
        setError("Account created but verification may be required. Please check your Clerk settings.");
      }
    } catch (err) {
      console.error("Signup error:", err.errors?.[0]?.message || err.message);
      setError(err.errors?.[0]?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // OAuth popup for Google / Apple (these will auto-login by default)
  const handleOAuthSignup = async (provider) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: window.location.origin + "/sso-callback",
        redirectUrlComplete: "/predict",
      });
    } catch (err) {
      console.error("OAuth signup error:", err);
    }
  };

  // Show success message after signup
  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-br from-[#e0d9d9] to-[#3d7db4] font-text px-4">
        <div className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-300 bg-white/70 backdrop-blur-md border border-white/30 p-8 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#325465] mb-2">Account Created!</h2>
            <p className="text-gray-600">
              Your account has been successfully created.
              <br />
              Redirecting to login page...
            </p>
          </div>
          <Link 
            to="/login" 
            className="text-[#0099ff] hover:underline font-semibold"
          >
            Click here if not redirected
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center items-center w-full bg-gradient-to-br from-[#e0d9d9] to-[#3d7db4] font-text px-4 py-25">
      <div className="w-full max-w-md rounded-2xl backdrop-blur-sm shadow-lg shadow-gray-300 bg-white/80 border border-white/30 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-3xl text-[#1d1d22] mb-2">Join Us Today</h1>
          <p className="text-sm text-[#279cd6] font-medium">
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
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
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
            <label className="block text-gray-700 text-sm font-medium mb-1">
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
        <p className="text-center text-sm text-gray-600 mt-4">
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
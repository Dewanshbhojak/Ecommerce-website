import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { registerUser } from "../Services/authService";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e?.preventDefault();

    if (!username.trim() || !email.trim() || !email.includes("@")) {
      showError("Please provide your full name and a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({ username, email, password: "USER_REGISTER_DEFAULT" });
      if (response && (response.status === 200 || response.data)) {
        const userData = response.data || { name: username, email };
        loginUser(userData);
        showSuccess("Account created successfully! Welcome to Vibe Luxe.");
        navigate("/home");
        return;
      }
    } catch (err) {
      console.log("Registration error", err);
      showError(err.response?.data?.message || "Unable to register account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link to="/home" className="inline-block">
          <h1 className="text-3xl font-serif font-bold tracking-wider text-stone-900">
            VIBE<span className="text-[#5A6B5C] font-sans text-sm font-semibold tracking-normal uppercase ml-1">LUXE</span>
          </h1>
        </Link>
        <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Bespoke Concierge Onboarding</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200/80 p-8 shadow-xl shadow-stone-200/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-medium text-stone-900">Create An Account</h2>
          <p className="text-stone-500 text-sm mt-1 font-light">
            Join Vibe Luxe for instant access to curated collections
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full h-12 bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 text-sm text-stone-900 focus:outline-none focus:border-[#5A6B5C] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 text-sm text-stone-900 focus:outline-none focus:border-[#5A6B5C] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#5A6B5C] hover:bg-[#4A584C] text-white font-semibold text-sm uppercase tracking-wider transition-colors shadow-sm inline-flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          Already a member?{" "}
          <Link to="/login" className="font-semibold text-[#5A6B5C] hover:underline">
            Sign In with OTP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, ShieldCheck, ArrowRight, RotateCcw, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { sendOtp, verifyOtp } from "../Services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { loginUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Send OTP Call
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendOtp(email);
      if (response && (response.status === 200 || response.data?.success)) {
        showSuccess(`OTP sent to ${email}`);
        setStep(2);
        setTimer(30);
      } else {
        setErrorMessage(response?.data?.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to send OTP. Please verify email or network connection.";
      setErrorMessage(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP & Login
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setErrorMessage("");

    if (!otp || otp.trim().length < 4) {
      setErrorMessage("Please enter the verification OTP sent to your email.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOtp(email, otp);
      if (response && response.data) {
        const userData = response.data.body || { email, name: email.split("@")[0] };
        loginUser(userData);
        showSuccess("Welcome back! Login successful.");
        navigate(from, { replace: true });
        return;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid or expired OTP. Please check your email or request a new code.";
      setErrorMessage(msg);
      showError(msg);
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
        <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Passwordless Concierge Access</p>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200/80 p-8 shadow-xl shadow-stone-200/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-medium text-stone-900">
            {step === 1 ? "Welcome Back" : "Security Verification"}
          </h2>
          <p className="text-stone-500 text-sm mt-1 font-light">
            {step === 1
              ? "Enter your email to receive a secure one-time passcode"
              : `We sent a passcode to ${email}`}
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FDF2F0] border border-[#C85A48]/30 flex items-start gap-3 text-xs text-[#7A281A]">
            <AlertCircle className="w-4 h-4 text-[#C85A48] shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
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
                "Sending Passcode..."
              ) : (
                <>
                  <span>Send One-Time Passcode</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification Input */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Verification OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#5A6B5C] hover:underline"
                >
                  Change Email
                </button>
              </div>

              <div className="relative">
                <ShieldCheck className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="Enter 6-digit passcode"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-12 bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 text-sm font-mono tracking-widest text-stone-900 focus:outline-none focus:border-[#5A6B5C] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#5A6B5C] hover:bg-[#4A584C] text-white font-semibold text-sm uppercase tracking-wider transition-colors shadow-sm inline-flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Sign In"}
            </button>

            {/* Resend Timer */}
            <div className="pt-2 text-center">
              {timer > 0 ? (
                <p className="text-xs text-stone-500 font-light">
                  Resend passcode in <span className="font-semibold text-stone-800">{timer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B5C] hover:text-[#4A584C] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resend Passcode</span>
                </button>
              )}
            </div>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          New to Vibe Luxe?{" "}
          <Link to="/register" className="font-semibold text-[#5A6B5C] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

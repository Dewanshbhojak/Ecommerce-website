import React, { useState } from 'react'
import {getOtp,changePassword} from '../Services/ForgetPassword'
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
const[email,setEmail] = useState("");
const [data, setData] = useState(null);
const[loading,setLoading] = useState(false);
const[step,setStep] = useState(1);
const[password,setPassword] = useState("");
const[otp,setOtp] = useState("");
const navigate = useNavigate();
const handleOtp= async()=> {
try {
  setLoading(true);
const response = await getOtp(email);

  setData(response.data.token);
    alert("OTP sent successfully.");

  setStep(2);

} catch(e) {
  alert(err.response?.data?.message || "Unable to send OTP");
}
finally{
  setLoading(false);
}
}

const handleChangePassword= async()=> {
try {
  setLoading(true);
const response = await changePassword(password, otp,data);
alert("Password changed successfully")
navigate("/");
} catch(e) {
   alert(err.response?.data?.message || "Something went wrong");
}
finally{
    setLoading(false);
}
}


   return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-slate-800">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mt-2">
          {step === 1
            ? "Enter your email to receive an OTP."
            : "Enter OTP and your new password."}
        </p>

        {/* Progress */}

        <div className="flex justify-center gap-3 mt-6">
          <div
            className={`h-2 w-20 rounded-full ${
              step === 1 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>

          <div
            className={`h-2 w-20 rounded-full ${
              step === 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        </div>

        {step === 1 && (
          <div className="mt-8 space-y-5">

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <button
              onClick={handleOtp}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </div>
        )}

        {step === 2 && (
          <div className="mt-8 space-y-5">

            <div className="relative">

              <ShieldCheck
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default ForgetPassword

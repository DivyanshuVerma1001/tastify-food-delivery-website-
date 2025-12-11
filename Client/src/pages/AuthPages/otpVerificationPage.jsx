import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { otpVerification } from '../../Store/authSlice'
import { toast } from "react-toastify";
const OtpVerification = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, phone } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const data = { email, otp: enteredOtp, phone };
    try {
      const reply = await dispatch(otpVerification(data));
      if (reply.type === "auth/otpVerification/fulfilled") {
        const successMessage = reply.payload?.message || "OTP verified successfully!";
        toast.success(successMessage);
      } else if (reply.type === "auth/otpVerification/rejected") {
        const errorMessage = reply.payload || "OTP verification failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-3">
          OTP Verification
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 5-digit OTP sent to your registered{" "}
          <span className="font-semibold text-gray-800">
            {email || phone}
          </span>
        </p>

        {/* OTP Form */}
        <form onSubmit={handleOtpVerification} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend Option */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={() => toast.info("Resend OTP feature coming soon!")}
            className="text-orange-500 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;

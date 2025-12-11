import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../../axiosClient/axiosClient";
import { toast } from "react-toastify";

const ForgotPassword = () => {
   useEffect(() => {
      document.title = "Forgot Password | Tastify";
    }, []);
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/user/forgotPassword",
        { email }
      );
      // Backend sends { success: true, message: "..." }
      const successMessage = res.data?.message || "Reset link sent successfully!";
      toast.success(successMessage);
    } catch (error) {
      // Backend sends { error: "..." } or { message: "..." }
      const errorMessage = 
        error.response?.data?.error ||
        error.response?.data?.message || 
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Don’t worry, it happens! Enter your email and we’ll send you a reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700 shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-600 mt-6">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

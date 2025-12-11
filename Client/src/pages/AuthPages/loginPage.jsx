import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../Store/authSlice";
import GoogleLoginWrapper from "../../googleAuth/googleLoginWrapper";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  useEffect(() => {
    document.title = "Login | Tastify";
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const reply = await dispatch(loginUser(data));
      if (reply.type === "auth/login/fulfilled") {
        const successMessage = reply.payload?.message || "Login successful!";
        toast.success(successMessage);
      } else if (reply.type === "auth/login/rejected") {
        const errorMessage = reply.payload || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#E8F5E9] 
px-4 transition-all duration-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Log in to explore restaurants & order food
        </p>

        {/* Google Auth */}
        <GoogleLoginWrapper />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-orange-500">
            <Mail className="text-gray-500 mr-2" size={18} />
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password with eye toggle */}
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="relative flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-orange-500">
            <Lock className="text-gray-500 mr-2" size={18} />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <NavLink
            to="/forgotPassword"
            className="text-sm text-orange-600 hover:underline"
          >
            Forgot password?
          </NavLink>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-200 ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Signup Link */}
        <div className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-orange-600 hover:underline font-medium"
          >
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;

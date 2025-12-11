import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { registerUser } from "../../Store/authSlice";
import { toast } from "react-toastify";

import GoogleRegisterWrapper from "../../googleAuth/googleRegisterWrapper";
import { Eye, EyeOff } from "lucide-react";

// Schema validation for signup
const signupSchema = z.object({
  name: z.string().min(3, "Name should contain at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password should contain at least 8 characters"),
  phone: z.string().min(10, "Phone number should have 10 digits"),
  verificationMethod: z.enum(["email", "phone"]),
});

function Signup() {
   useEffect(() => {
      document.title = "Signup | Tastify";
    }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !window.location.pathname.includes("otpverification")) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    try {
      const reply = await dispatch(registerUser(data));
      console.log("signup page par jo respnse aya hai :" ,reply)
      if (reply.type === "auth/register/fulfilled") {
        // Show success toast from backend message
        const successMessage = reply.payload?.message || "Verification code sent successfully!";
        toast.success(successMessage);
        navigate(`/otpverification/${data.email}/${data.phone}`);
      } else if (reply.type === "auth/register/rejected") {
        // Show error toast from backend message
        const errorMessage = reply.payload || "Registration failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error in registerUser:", err);
    }
  };

  return (
    <div className="flex py-5 h-screen items-center justify-center bg-gradient-to-br from-orange-200 via-orange-100 to-red-100 px-2">
      <div className="flex w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        
        {/* Left side illustration */}
<div className="hidden md:flex w-1/2 relative">
  <img
    src="/assets/registrationPgFood.jpg"
    alt="Delicious food"
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
  {/* Text */}
  <div className="absolute bottom-6 left-6 text-white">
    <h2 className="text-2xl font-bold drop-shadow-lg">
      Fresh Meals, Fast Delivery 🍴
    </h2>
    <p className="mt-1 text-xs opacity-90">
      Order your favorites & track them in real time!
    </p>
  </div>
</div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Create Account</h2>
          <p className="text-xs text-gray-500 mb-6">
            Sign up and enjoy quick, delicious meals 🚀
          </p>

          <GoogleRegisterWrapper />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-1">Name</label>
              <input
                {...register("name")}
                placeholder="Enter your name"
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-1 focus:ring-orange-400 focus:outline-none transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@email.com"
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-1 focus:ring-orange-400 focus:outline-none transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold mb-1">Phone</label>
              <div className="flex">
                <span className="px-3 py-2 border rounded-l-lg bg-gray-100 text-gray-600 text-xs">
                  +91
                </span>
                <input
                  {...register("phone")}
                  placeholder="9876543210"
                  className="flex-1 px-3 py-2 border-t border-b border-r rounded-r-lg focus:ring-1 focus:ring-orange-400 focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
              {errors.phone && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password with eye toggle */}
            <div>
              <label className="block text-xs font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-1 focus:ring-orange-400 focus:outline-none transition-all duration-200 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Verification Method */}
            <div>
              <p className="text-xs font-semibold mb-1">Verification Method</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer text-xs">
                  <input
                    type="radio"
                    value="email"
                    {...register("verificationMethod")}
                    className="accent-orange-500"
                  />
                  <span>Email</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-xs">
                  <input
                    type="radio"
                    value="phone"
                    {...register("verificationMethod")}
                    className="accent-orange-500"
                  />
                  <span>Phone</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-orange-500 to-red-500 shadow hover:shadow-md hover:scale-[1.02] transition-transform duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Switch to Login */}
          <p className="text-center text-xs mt-4">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-orange-600 font-semibold hover:underline hover:text-red-500 transition"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

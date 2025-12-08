import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import axiosClient from "../../axiosClient/axiosClient";
import { toast } from "react-toastify";
import FoodDeliveryLoader from "../../Components/FoodDeliveryLoader";
import { Eye, EyeOff } from "lucide-react"; 

const ResetPassword = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await axiosClient
      .post(`/user/resetPassword/${token}`, { password, confirmPassword })
      .then(async (res) => {
        toast.success(res.data.message);
        setShowLoader(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error(error);
      });
  };

  if (isAuthenticated) return <Navigate to="/" />;
  if (showLoader) return <FoodDeliveryLoader />;

  useEffect(() => {
    document.title = "Reset Password | Tastify";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#E8F5E9] px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-100 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          Reset Password 🔐
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Set a strong new password to secure your account
        </p>

        <form className="space-y-5" onSubmit={handleResetPassword}>
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
                text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 
            text-white font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-orange-600 hover:underline text-sm font-medium"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

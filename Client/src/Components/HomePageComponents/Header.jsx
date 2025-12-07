import { Link } from "react-router";
import { motion } from "framer-motion";
import TypingText from "./AnimatedTagLine";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="min-h-screen bg-gradient-to-br from-[#ff5200] via-[#f75402] to-[#ff5200] font-serif overflow-hidden relative">
      {/* Navbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-between container mx-auto py-4 md:py-8 px-4"
      >
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center text-white text-2xl md:text-4xl font-sans font-bold gap-2 md:gap-3"
        >
          <img
            className="w-16 h-14 md:w-28 md:h-24 select-none"
            draggable="false"
            src="/assets/logo.png"
            alt="logo"
          />
          <h1 className="tracking-wide drop-shadow-lg">Tastify</h1>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex text-white font-bold gap-8 xl:gap-12 items-center text-lg xl:text-[20px]">
          <a
            onClick={() =>
              document
                .getElementById("foodOption")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer hover:text-yellow-100 transition"
          >
            Best Deals
          </a>
          <a
            onClick={() =>
              document
                .getElementById("groceryOption")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer hover:text-yellow-100 transition"
          >
            Popular Picks
          </a>
          <a
            href="https://divyanshu-verma.me"
            target="_blank"
            rel="noreferrer"
            className="border border-white py-2 px-3 xl:py-3 xl:px-4 rounded-2xl hover:bg-orange-500 transition-all duration-300 text-sm xl:text-base"
          >
            Contact Us
          </a>

          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center gap-2">
              <UserCircleIcon className="w-10 h-10 xl:w-12 xl:h-12 text-white transition duration-200" />
            </Link>
          ) : (
            <Link to="/signup">
              <p className="border border-black py-2 px-3 xl:py-3 xl:px-4 rounded-2xl bg-black hover:bg-gray-900 transition text-sm xl:text-base">
                Sign in
              </p>
            </Link>
          )}
        </div>

        {/* Mobile: Profile/Sign in + Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Profile/Sign in - Mobile */}
          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center">
              <UserCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white transition duration-200" />
            </Link>
          ) : (
            <Link to="/signup">
              <p className="border border-black py-1.5 px-3 rounded-xl bg-black hover:bg-gray-900 transition text-sm">
                Sign in
              </p>
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-8 h-8" />
            ) : (
              <Bars3Icon className="w-8 h-8" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden px-4 pb-4"
        >
          <div className="flex flex-col gap-4 text-white font-bold">
            <a
              onClick={() => {
                document
                  .getElementById("foodOption")
                  .scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-yellow-100 transition py-2"
            >
              Best Deals
            </a>
            <a
              onClick={() => {
                document
                  .getElementById("groceryOption")
                  .scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-yellow-100 transition py-2"
            >
              Popular Picks
            </a>
            <a
              href="https://divyanshu-verma.me"
              target="_blank"
              rel="noreferrer"
              className="border border-white py-2 px-4 rounded-2xl hover:bg-orange-500 transition-all duration-300 text-center"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="pt-8 md:pt-16 pb-8 relative">
        {/* Left Image - Hidden on mobile */}
        <motion.img
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          draggable="false"
          className="hidden md:block h-[20rem] md:h-[28rem] w-40 md:w-60 absolute top-0 left-0"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
          alt="veggies"
        />

        {/* Right Image - Hidden on mobile */}
        <motion.img
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          draggable="false"
          className="hidden md:block h-[20rem] md:h-[28rem] w-40 md:w-60 top-0 absolute right-0"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
          alt="sushi"
        />

        {/* Typing Text Animation */}
        <div className="relative z-10 px-4">
          <TypingText />
        </div>

        {/* Hero Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-[90%] md:max-w-[60%] mt-6 md:mt-10 container mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold tracking-wide drop-shadow-lg px-4"
        >
          Discover Best Restaurants!
        </motion.div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-[95%] md:max-w-[80%] container mx-auto flex items-center justify-center px-4"
      >
        <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 w-full sm:w-auto">
          {/* Button 1 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-bold text-white bg-black/80 rounded-full hover:bg-black transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40"
              to="/Restaurants"
            >
              <span className="relative z-10">Start Ordering</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="ml-2 md:ml-3 w-6 h-6 md:w-9 md:h-9 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Button 2 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-bold text-white bg-green-900 rounded-full hover:bg-green-800 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40"
              to="/Restaurants"
            >
              <span className="relative z-10">Explore Restaurants</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="ml-2 md:ml-3 w-6 h-6 md:w-9 md:h-9 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}

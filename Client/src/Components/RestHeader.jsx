import { useSelector } from "react-redux";
import { UserCircleIcon, HomeIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router";

export default function RestHeader() {
  const counter = useSelector((state) => state.cartslice.count);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="fixed font-heading top-0 left-0 w-full z-50 bg-[#ff5200] shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            className="h-10 sm:h-12 md:h-15 w-auto border-white shadow-md"
            src="/assets/navLogo.png"
            alt="logo"
          />
          <span className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-wide">Tastify</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-10 text-white font-semibold text-base sm:text-lg md:text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 transition-all duration-300 ${isActive
                ? "bg-[#fd7412] text-white rounded-2xl p-2 shadow-md scale-105"
                : "hover:bg-[#fd7412] hover:text-white p-2 rounded-2xl"
              }`
            }
          >
            <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/restaurants"
            className={({ isActive }) =>
              `flex items-center gap-2 sm:gap-3 transition-all duration-300 ${isActive
                ? "bg-[#fd7412] text-white rounded-xl md:rounded-2xl p-1.5 sm:p-2 shadow-md scale-105"
                : "hover:bg-[#fd7412] hover:text-white p-1.5 sm:p-2 rounded-xl md:rounded-2xl"
              }`
            }
          >
            <BuildingStorefrontIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <span className="hidden sm:inline">Restaurants</span>
          </NavLink>


          {/* Cart */}
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `relative flex items-center gap-2 sm:gap-3 transition-all duration-300 ${
                isActive
                  ? "bg-[#f77213] text-white rounded-xl md:rounded-2xl border-2 border-white/35 p-1.5 sm:p-2 shadow-md scale-105"
                  : "hover:bg-[#fd7412] hover:text-white p-1.5 sm:p-2 rounded-xl md:rounded-2xl"
              }`
            }
          >
            <img
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
              draggable="false"
              src="/assets/cartSymbol.png"
              alt="cart"
            />
            {counter > 0 && (
              <span className="absolute -top-1 -right-2 sm:-right-3 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-full px-1.5 sm:px-2">
                {counter}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </NavLink>

          {/* Auth */}
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center transition-all duration-300 ${
                  isActive
                    ? "scale-110 text-white"
                    : "hover:text-gray-200"
                }`
              }
            >
              <UserCircleIcon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            </NavLink>
          ) : (
            <NavLink
              to="/signup"
              className="bg-black text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg md:rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-900 transition"
            >
              <span className="hidden sm:inline">Sign in</span>
              <span className="sm:hidden">Sign in</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

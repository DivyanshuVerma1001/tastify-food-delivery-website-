  import React from "react";

  const MenuShimmerCard = () => {
    return (
      <div className="flex  justify-between mb-2 pb-2 mt-3  animate-pulse">
        {/* Left Side: Text info */}
        <div className="w-[70%] space-y-2">
          <div className="h-6 w-48 bg-gray-300 rounded"></div> {/* Name */}
          <div className="h-5 w-10 bg-gray-300 rounded"></div> {/* Veg/Nonveg */}
          <div className="h-5 w-28 bg-gray-300 rounded"></div> {/* Price */}
          <div className="h-5 w-20 bg-gray-300 rounded"></div> {/* Rating */}
          <div className="h-5 w-3/4 bg-gray-300 rounded"></div> {/* Description */}
        </div>

        {/* Right Side: Image placeholder */}
        <div className="w-[20%] h-36">
          <div className="w-full h-36 bg-gray-300 rounded-3xl"></div>
        </div>
      </div>
    );
  };

  export default MenuShimmerCard;

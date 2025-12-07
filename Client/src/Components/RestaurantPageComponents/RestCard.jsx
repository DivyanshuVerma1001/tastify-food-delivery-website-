import { Link } from "react-router";
export default function RestCard({ restInfo }) {
  return (
    <Link to={"/city/delhi/"+restInfo?.info?.id}>
    <div className="w-full sm:w-[280px] rounded-2xl shadow-md bg-white overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image */}
      <img
        className="w-full h-36 sm:h-44 object-cover"
        src={"https://media-assets.swiggy.com/swiggy/image/upload/" + restInfo?.info?.cloudinaryImageId}
        alt={restInfo?.info?.name}
      />

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Restaurant Name */}
        <div className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {restInfo?.info?.name}
        </div>

        {/* Rating and Delivery Time */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mt-2">
          {/* Rating with star icon */}
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-green-600"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{restInfo?.info?.avgRating}</span>
          </div>

          {/* Delivery Time */}
          <span className="text-gray-500 text-xs sm:text-sm">{restInfo?.info?.sla?.slaString}</span>
        </div>

        {/* Cuisine */}
        <div
          className="text-xs sm:text-sm text-gray-500 truncate mt-2"
          title={restInfo?.info?.cuisines.join(", ")}
        >
          {restInfo?.info?.cuisines.join(", ")}
        </div>

        {/* Area Name */}
        <div className="text-xs sm:text-sm text-gray-400 mt-1">
          {restInfo?.info?.areaName}
        </div>
      </div>
    </div>
    </Link> 
  );
}

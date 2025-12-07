import { Link } from "react-router";

export default function FoodCard({ foodData }) {
  return (
    <div className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] flex-shrink-0 text-center">
      <Link to="/restaurants">
        <img
          draggable="false"
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-lg md:rounded-xl object-cover mx-auto"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${foodData?.imageId}`}
          alt="food"
        />
      </Link>
      <p className="mt-1 md:mt-2 text-xs sm:text-sm font-semibold px-1">{foodData?.name}</p>
    </div>
  );
}

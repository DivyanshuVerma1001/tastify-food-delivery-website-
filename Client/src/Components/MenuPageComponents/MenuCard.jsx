import { useState } from "react";
import RestInfo from "./RestInfo";

export default function MenuCard({
  foodSelected,
  priceRange,
  minRating,
  bestsellerOnly,
  sortOrder,
  menuItems,
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Case 1: Categories (recursive rendering)
  if ("categories" in menuItems) {
    return (
      <div className="w-full">
        <p className="font-bold text-xl sm:text-2xl md:text-3xl text-center mb-4 md:mb-5 p-2 mt-4 md:mt-5">
          {menuItems.title}
        </p>
        <div>
          {menuItems?.categories?.map((items) => (
            <MenuCard
              key={items?.title}
              foodSelected={foodSelected}
              priceRange={priceRange}
              minRating={minRating}
              bestsellerOnly={bestsellerOnly}
              sortOrder={sortOrder}
              menuItems={items}
            />
          ))}
        </div>
      </div>
    );
  }

  // Case 2: Collapsed section
  if (!isOpen) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg sm:text-xl md:text-2xl mb-3">{menuItems.title}</p>
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <img
              className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 mr-4 sm:mr-6 md:mr-10 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              src="../../assets/dropDown.png"
              alt="dropdown"
            />
          </button>
        </div>
        <div className="pl-2 pr-4 sm:pr-6 md:pr-10">
        <div className="h-3 w-full bg-[#02060C0D] mb-4 md:mb-5"></div>
        </div>
      </div>
    );
  }

  // Case 3: Items list with filters + sort
  let itemsToShow = menuItems?.itemCards || [];

  // Veg / Non-Veg
  if (foodSelected === "veg") {
    itemsToShow = itemsToShow.filter((food) => food?.card?.info?.isVeg === 1);
  }
  if (foodSelected === "nonveg") {
    itemsToShow = itemsToShow.filter((food) => !food?.card?.info?.isVeg);
  }

  // Price filter
  itemsToShow = itemsToShow.filter(
    (food) =>
      food?.card?.info?.price / 100 >= priceRange[0] &&
      food?.card?.info?.price / 100 <= priceRange[1]
  );

  // Rating filter
  if (minRating) {
    itemsToShow = itemsToShow.filter(
      (food) =>
        parseFloat(food?.card?.info?.ratings?.aggregatedRating?.rating || 0) >=
        minRating
    );
  }

  // Bestseller filter
  if (bestsellerOnly) {
    itemsToShow = itemsToShow.filter((food) => food?.card?.info?.isBestseller);
  }

  // 🔹 Apply Sorting
  if (sortOrder === "lowToHigh") {
    itemsToShow = [...itemsToShow].sort(
      (a, b) =>
        (a?.card?.info?.price || 0) - (b?.card?.info?.price || 0)
    );
  } else if (sortOrder === "highToLow") {
    itemsToShow = [...itemsToShow].sort(
      (a, b) =>
        (b?.card?.info?.price || 0) - (a?.card?.info?.price || 0)
    );
  }

  if (itemsToShow.length === 0) return <></>;

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg sm:text-xl md:text-2xl mb-5 md:mb-7">{menuItems.title}</p>
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <img
            className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 mr-4 sm:mr-6 md:mr-10 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            src="../../assets/dropDown.png"
            alt="dropdown"
          />
        </button>
      </div>

      {/* Items List */}
      {itemsToShow?.map((items) => (
        <RestInfo
          key={items?.card?.info?.id}
          isVeg={items?.card?.info?.isVeg === 1}
          restData={items?.card?.info}
        />
      ))}
    </div>
  );
}

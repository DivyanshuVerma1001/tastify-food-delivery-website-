import { imageGridCards } from "../../Utils/Grocery";
import GroceryCard from "./GroceryCard";
import { useRef, useEffect } from "react";
import {CircleArrowRight,CircleArrowLeft} from "lucide-react"

export default function GroceryOption() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 150 + 12; // card width + gap
    let scrolled = 0;

    const runScroll = () => {
      let interval = setInterval(() => {
        scrollContainer.scrollLeft += 1; // same as FoodOption
        scrolled += 1;

        if (scrolled >= cardWidth) {
          scrolled = 0;
          clearInterval(interval);
          setTimeout(runScroll, 300); // pause 300ms per card
        }

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }, 10); // interval same as FoodOption for speed
    };

    runScroll(); // start scrolling

  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 150;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 150;
  };

  return (
    <div id="groceryOption" className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] container mx-auto mt-10 md:mt-20 relative mb-10 md:mb-20 pt-10 md:pt-20 px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mb-5">Shop Groceries on Instamart</h1>

      {/* Top-right manual buttons */}
      <div className="absolute top-12 md:top-15 right-1 flex gap-2 z-10">
        <button
          onClick={scrollRight}
          className="bg-white/80 hover:bg-white shadow-md rounded-full p-1"
        >
          <CircleArrowLeft  className="h-6 w-6 md:h-10 md:w-10 text-slate-500"/>
        </button>
        <button
          onClick={scrollLeft}
          className="bg-white/80 hover:bg-white shadow-md rounded-full p-1"
        >
          <CircleArrowRight  className="h-6 w-6 md:h-10 md:w-10 text-slate-500"/>
        </button>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-2 md:gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {imageGridCards.concat(imageGridCards).map((foodData, idx) => (
          <GroceryCard key={idx} foodData={foodData} />
        ))}
      </div>
    </div>
  );
}

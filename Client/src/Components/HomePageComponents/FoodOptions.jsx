import { imageGridCards } from "../../Utils/Food";
import FoodCard from "./FoodCard";
import { useRef, useEffect } from "react";

import {CircleArrowRight,CircleArrowLeft} from "lucide-react"

export default function FoodOption() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 150 + 12; // adjust: card width + gap
    let scrolled = 0;

    const interval = setInterval(() => {
      scrollContainer.scrollLeft += 1;
      scrolled += 1;

      // pause after one card
      if (scrolled >= cardWidth) {
        scrolled = 0;
        // pause for 300ms
        clearInterval(interval);
        setTimeout(() => {
          runScroll();
        }, 300);
      }

      // infinite loop
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }, 10); // adjust speed: smaller = faster

    const runScroll = () => {
      const newInterval = setInterval(() => {
        scrollContainer.scrollLeft += 1;
        scrolled += 1;

        if (scrolled >= cardWidth) {
          scrolled = 0;
          clearInterval(newInterval);
          setTimeout(runScroll, 300);
        }

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }, 10);
    };

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 150;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 150;
  };

  return (
    <div id="foodOption" className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] container mx-auto mt-10 md:mt-20 relative mb-10 md:mb-20 pt-10 md:pt-20 px-4">
      {/* Top-right buttons */}
      <div className="absolute top-1 right-1 md:right-1 flex gap-2 z-10">
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

      <div
        ref={scrollRef}
        className="flex gap-2 md:gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {imageGridCards.concat(imageGridCards).map((foodData, idx) => (
          <FoodCard key={idx} foodData={foodData} />
        ))}
      </div>
    </div>
  );
}

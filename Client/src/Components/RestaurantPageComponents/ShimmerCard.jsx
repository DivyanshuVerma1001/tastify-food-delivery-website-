import React from "react";

export default function ShimmerCard() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -450px 0;
          }
          100% {
            background-position: 450px 0;
          }
        }
        .shimmer {
          background: linear-gradient(
            to right,
            #e0e0e0 0%,
            #f8f8f8 50%,
            #e0e0e0 100%
          );
          background-size: 900px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <div className="w-[calc(50%-6px)] sm:w-[280px] h-[280px] sm:h-auto rounded-2xl shadow-md bg-white overflow-hidden relative flex flex-col">
        {/* Image placeholder - Fixed height for mobile responsiveness */}
        <div className="w-full h-48 sm:h-44 rounded-xl shimmer flex-shrink-0"></div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-4 flex-1 flex flex-col justify-between">
          <div className="h-5 w-3/4 rounded-xl shimmer"></div>
          <div className="flex gap-4">
            <div className="h-4 w-14 rounded-xl shimmer"></div>
            <div className="h-4 w-24 rounded-xl shimmer"></div>
          </div>
          <div className="h-4 w-full rounded-xl shimmer"></div>
          <div className="h-4 w-1/2 rounded-xl shimmer"></div>
        </div>
      </div>
    </>
  );
}

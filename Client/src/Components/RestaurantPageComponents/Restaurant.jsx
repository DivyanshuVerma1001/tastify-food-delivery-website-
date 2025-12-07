import { useEffect, useState, useRef } from "react";
import RestCard from "./RestCard";
import ShimmerCard from "./ShimmerCard"; // individual card placeholder

export default function Restaurant() {
  const [RestData, setRestData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  async function fetchData(currentOffset) {
    setLoading(true);
    try {
      // const proxyServer="https://cors-anywhere.herokuapp.com/"
      // const proxyUrl = "http://localhost:8080/";
      // const vercel ="https://cors-proxy-vercel-pied.vercel.app/api/proxy?url="
      // const newswiggyAPI="https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      // const swiggyAPI="https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.63270&lng=77.21980&carousel=true&third_party_vendor=1"

      const encodedURL = encodeURIComponent(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&offset=${currentOffset}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      const finalAPI = `https://cors-proxy-vercel-pied.vercel.app/api/proxy?url=${encodedURL}`;

      const response = await fetch(finalAPI);
      const data = await response.json();

      const newRestaurants =
        data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      if (newRestaurants.length === 0) {
        setHasMore(false);
      } else {
        setRestData((prev) => [...prev, ...newRestaurants]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

useEffect(() => {
  document.title = "Restaurants | Tastify";
}, []);


  // Intersection observer for lazy loading
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prev) => prev + 16); // Swiggy returns 16 items per page
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  if (!loading && RestData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-2xl font-semibold">
        🍽️ No restaurants found in your area!
      </div>
    );
  }

  return (
    <div id="list" className="flex mix-h-[80vh] flex-wrap w-[95%] sm:w-[90%] md:w-[85%] mx-auto items-center justify-center mt-15 md:mt-25 gap-3 md:gap-5 pb-10 md:pb-15 px-4">
    <div  className="flex flex-wrap w-full mx-auto justify-center items-center gap-3 md:gap-5 pb-10 md:pb-15">
      {/* Render restaurant cards */}
      {RestData.map((restInfo) => (
        <RestCard key={restInfo.info.id} restInfo={restInfo} />
      ))}

      {/* Render shimmer cards inline during loading */}
      {loading &&
        Array(8)
          .fill(0)
          .map((_, index) => <ShimmerCard key={`shimmer-${index}`} />)}

      {/* Observer div for triggering next page */}
      <div ref={observerRef} className="w-full text-center mt-5">
        {!loading && hasMore && (
          <p className="text-gray-500 text-lg"></p>
        )}
      </div>
      </div>
    </div>
  );
}

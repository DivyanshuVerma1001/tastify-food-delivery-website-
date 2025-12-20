import { useState } from "react";
import { addItems, IncrementItems, DecrementItems } from "../../Store/CardSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaStar } from "react-icons/fa6";

export default function RestInfo({ restData, isVeg }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cartslice.items);
  const element = items.find((item) => item.id === restData.id);
  const count = element ? element.quantity : 0;
  const dispatch = useDispatch();
  const [showFullDesc, setShowFullDesc] = useState(false);

  function handleAdditems() {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(addItems(restData));
  }

  function handleIncrementItems() {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(IncrementItems(restData));
  }

  function handleDecrementItems() {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(DecrementItems(restData));
  }

  return (
    <>
      <div className="flex font-body w-full justify-between mb-2 pb-5 mt-3 px-2">
        <div className="w-[70%]">
          <p className=" text-md md:text-2xl text-slate-800 font-semibold mb-2">{restData?.name}</p>
          <p>
            <img
              className="h-3  md:h-5"
              src={isVeg ? "../../assets/vegSymbol.png" : "../../assets/nonvegSymbol.png"}
              alt=""
            />
          </p>
          <p className="text-sm md:text-xl">₹ {restData?.price / 100}</p>
          <div className="flex items-center ">
            <FaStar className="text-green-700  " />  
          <span className="text-green-700 font-bold ">
            

            {restData?.ratings?.aggregatedRating?.rating}
          </span>
          <span className="text-gray-600">
            {"[" + restData?.ratings?.aggregatedRating?.ratingCountV2 + "]"}
          </span>
          </div>
            <div className= "flex items-baseline">
        
          {/* ✅ Description with "more/less" */}
          <p
            className={`text-gray-600 text-sm md:text-lg ${
              showFullDesc ? "" : "truncate max-w-[90%]"
            }`}
          >
            {restData?.description}
          </p>
          {restData?.description?.length > 70 && (
            <button
              className="text-green-600 cursor-pointer text-sm md:text-lg font-semibold mt-1"
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? "" : "more"}
            </button>
          )}
          </div>
        </div>

        <div className=" w-[ 30%] md:w-[20%] relative h-36 ml-3">
          <img
            draggable="false"
            className=" rounded-3xl h-28 w-28 md:h-36 object-cover"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/" +
              restData?.imageId
            }
            alt=""
          />
          {count === 0 ? (
            <button
              id="button"
              onClick={handleAdditems}
              className="absolute cursor-pointer text-green-600 text:sm md:text-xl font-bold px-2 md:px-4 md:py-2 py-1 shadow-2xl border rounded-xl bg-white bottom-[10px] md:bottom-[-19px] left-1/2 -translate-x-1/2"
            >
              ADD
            </button>
          ) : (
            <div className="absolute text-green-600 font-bold flex items-center border-2 rounded-xl bg-white bottom-[10px] md:bottom-[-19px] left-1/2 -translate-x-1/2">
              <button
                className="text-md md:text-3xl  px-2 md:px-3 py-1 cursor-pointer hover:bg-slate-100 rounded-l-xl hover:border-r-2 hover:border-slate-200"
                onClick={handleDecrementItems}
              >
                -
              </button>
              <span className="px-1 md:px-2 text-md md:text-2xl">{count}</span>
              <button
                className="text-md md:text-2xl px-2 md:px-3 py-1 cursor-pointer hover:bg-slate-100 rounded-r-xl"
                onClick={handleIncrementItems}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="mb-6 mt-2" />
    </>
  );
}

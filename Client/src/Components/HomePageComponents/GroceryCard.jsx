export default function GroceryCard({foodData}){
    return(
        <div className="flex-none min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
        <a>
        <img draggable="false" className="w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-45 rounded-lg md:rounded-xl object-cover mx-auto" src={`https://media-assets.swiggy.com/swiggy/image/upload/${foodData?.imageId}`} alt={foodData?.action?.text}></img>
        </a>
        <h2 className="text-center mt-2 md:mt-3 font-semibold text-slate-700 text-xs sm:text-sm md:text-base mb-2 px-1">{foodData?.action?.text}</h2>
        </div>
    )
}
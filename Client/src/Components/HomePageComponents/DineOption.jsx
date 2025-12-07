import { dineoutRestaurants } from "../../Utils/DineData";
import DineCard from "./DineCard";
export default function DineOption(){


    return (
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto mt-10 md:mt-20 pb-10 md:pb-15 px-4">
            <p className="text-xl sm:text-2xl font-bold">Discover best restaurant on Dineout</p>
            <div className="flex flex-nowrap overflow-x-auto mt-4 md:mt-5 gap-3 md:gap-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {
                    dineoutRestaurants.map((RestData)=><DineCard key={RestData?.info?.id} RestData={RestData}></DineCard>)
                }
            </div>
        </div>
    )
}
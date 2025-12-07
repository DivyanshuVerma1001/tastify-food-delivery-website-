import { Outlet } from "react-router";
import RestHeader from "../Components/RestHeader";
import Footer from "../Components/HomePageComponents/Footer";



export default function SecondaryHome(){

    return (
        <>
            <RestHeader></RestHeader>
            <div className="mt-14 sm:mt-16 md:mt-17 px-2 sm:px-4"> </div>
            <Outlet  ></Outlet>
            <Footer></Footer>
        </>        
    )
}
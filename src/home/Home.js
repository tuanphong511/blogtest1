import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ListBlog from "./blog/ListBlog";

export default function Home() {
    return (
        <>
            {/*<div className="row">*/}
            {/*    <div className="col-12">*/}
            {/*        <Navbar></Navbar>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='container'>*/}
            {/*    <div className="row">*/}
            {/*        <div className='col-1'>*/}
            {/*            <SideBar></SideBar>*/}
            {/*        </div>*/}
            {/*        <div className="col-11 ">*/}
            {/*            <Outlet></Outlet>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="flex flex-col h-screen">
                <div className="flex-none ">
                    <Navbar/>
                </div>
                <div className="flex flex-1">
                    <div className="w-1/5">
                        <SideBar/>
                    </div>
                    <div className="w-3/5">
                        <Outlet/>

                    </div>
                </div>
            </div>
        </>
    )
}
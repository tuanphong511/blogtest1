import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Navbar></Navbar>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Outlet></Outlet>
                </div>
            </div>


        </>
    )
}

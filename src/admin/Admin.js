import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

export default function Admin() {
    return (
        <>
            <Navbar></Navbar>
            <hr/>
            <h1>Admin User</h1>
            <h1>
                <center>
                    <Link to={"/admin/product"}>product</Link>

                    <br/>
                    <Link to={"/admin/order"}>order</Link>
                </center>
            </h1>


            <Footer></Footer>
        </>
    )
}

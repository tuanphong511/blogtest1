import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

export default function Register() {
    return (
        <>
            <div className="row">

                <div className="offset-3 col-6">
                    <h1>Register</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className={"form-control"}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className={"form-control"}/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="submit" className="ml-3 btn btn-secondary">
                            <Link to={'/'} style={{textDecoration:'none', color:"white"}}>Login</Link>
                        </button>
                    </form>
                </div>
            </div>

            {/*<Header></Header>*/}
            {/*<Navbar></Navbar>*/}
            {/*<hr/>*/}
            {/*<h1>Register</h1>*/}
            {/*<h1><center>*/}
            {/*    <Link to={"/"}>Login</Link>*/}
            {/*</center></h1>*/}
            {/*<Footer></Footer>*/}
        </>
    )
}

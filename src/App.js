import logo from './logo.svg';
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";

import HomeDetail from "./home/HomeDetail";
import Admin from "./admin/Admin";
import AdminOrder from "./admin/AdminOrder";
import AdminProduct from "./admin/AdminProduct";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs} from "./services/blogService";
import ListBlog from "./home/blog/ListBlog";
import AddBlog from "./home/blog/AddBlog";
import EditBlog from "./home/blog/EditBlog";

function App() {
    const dispatch = useDispatch()
    // const blogs = useSelector(state => {
    //     console.log(state)
    //     return state
    // })
    useEffect(() =>{
        dispatch(getBlogs)
    }, [])
    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={''} element={<Login></Login>}></Route>
                    <Route path={'register'} element={<Register></Register>}></Route>
                    <Route path={'home'} element={<Home></Home>}>
                        <Route path={''} element={<ListBlog></ListBlog>}></Route>
                        <Route path={'add-blog'} element={<AddBlog></AddBlog>}></Route>
                        <Route path={'edit-blog/:id'} element={<EditBlog></EditBlog>}></Route>
                    </Route>
                </Routes>
            </div>
            {/*<Outlet></Outlet>*/}
            {/*<Routes>*/}
            {/*    <Route path="" element={<Login/>}/>*/}
            {/*    <Route path="/register" element={<Register/>}/>*/}
            {/*    <Route path="/home" element={<Home/>}></Route>*/}

            {/*    <Route path="/home/detail" element={<HomeDetail/>}/>*/}
            {/*    /!*<Route path="/admin" element={<Admin/>}/>*!/*/}
            {/*    <Route path="/admin" element={<Admin/>}></Route>*/}
            {/*    <Route path="/admin/product" element={<AdminProduct/>}></Route>*/}
            {/*    <Route path="/admin/order" element={<AdminOrder/>}></Route>*/}
            {/*</Routes>*/}
        </>
    );
}

export default App;

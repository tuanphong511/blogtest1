import logo from './logo.svg';
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs} from "./services/blogService";
import ListBlog from "./home/blog/ListBlog";
import AddBlog from "./home/blog/AddBlog";
import EditBlog from "./home/blog/EditBlog";
import Home from "./home/Home";
import ProfileBlog from "./home/blog/ProFile";

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
                    <Route path={'/home'} element={<Home></Home>}>
                        <Route path={''} element={<ListBlog></ListBlog>}></Route>
                        <Route path={'add-blog'} element={<AddBlog></AddBlog>}></Route>
                        <Route path={'edit-blog/:id'} element={<EditBlog></EditBlog>}></Route>
                        <Route path={'profile'} element={<ProfileBlog></ProfileBlog>}></Route>
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

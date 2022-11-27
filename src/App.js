import logo from './logo.svg';
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
    return (
        <>
            <Outlet></Outlet>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </>
    );
}

export default App;

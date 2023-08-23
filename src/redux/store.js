import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "./blogs/blogSlice";
import userReducer from "./user/userSlice"


export const store = configureStore({
    reducer:{
        blogs: blogReducer,
        user : userReducer
    }
})
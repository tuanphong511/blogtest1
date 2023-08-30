import {createSlice} from "@reduxjs/toolkit";
import {addBlogs, deleteBlogs, getBlogs} from "../../services/blogService";

const initialState = {
    blogs: []
}
const blogSlice =createSlice({
    name: 'blogs',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getBlogs.fulfilled, (state, action) =>{
            state.blogs = action.payload.data
        })
        builder.addCase(addBlogs.fulfilled, (state, action) =>{
            console.log("blogSlice",action.payload)
            state.blogs.push(action.payload)
        })

    }
})
export default blogSlice.reducer
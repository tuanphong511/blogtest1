import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogs = createAsyncThunk(
    'blogs/getBlogs',
    async () =>{
        const res  = await axios.get('http://localhost:3002/blogs')
        return res
    }
)
export const addBlogs = createAsyncThunk(
    'blogs/addBlogs',
    async (data) =>{
        const res  = await axios.post('http://localhost:3002/blogs',data)
        return res.data
    }
)
export const deleteBlogs = createAsyncThunk(
    'blogs/deleteBlogs',
    async (id) =>{
        const res  = await axios.delete(`http://localhost:3002/blogs/${id}`)
        return res
    }
)
export const updateBlogs = createAsyncThunk(
    'blogs/updateBlogs',
    async (id) =>{
        const res  = await axios.put(`http://localhost:3002/blogs/${id}`)
        return res
    }
)


import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk(
    'user/login',
    async (data) =>{
        const res = await axios.post('http://localhost:3002/users/login', data)
            return res;

    }
)
export const register = createAsyncThunk(
    'user/register',
    async (data) =>{
        const res = await axios.post('http://localhost:3002/users/register', data);
        return res.data

    }
)

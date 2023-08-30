import axios from "axios";

const customAxios = axios.create({
    baseURL:'http://localhost:3002'
})
export default customAxios
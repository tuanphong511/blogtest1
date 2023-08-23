import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteBlogs, getBlogs} from "../../services/blogService";
import {login} from "../../services/userService";
import axios from "axios";
import async from "async";
import {Link, useNavigate} from "react-router-dom";

export default function ListBlog (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blogs = useSelector(state => {
        return state.blogs.blogs
    })
    useEffect(() =>{
        dispatch(getBlogs())
    }, [])
    const handleDelete =  ( (id)=>{
      dispatch(deleteBlogs(id)).then(()=>{
            dispatch(getBlogs())
           navigate("/home")
        })
    })


    return(
        <div className={'row'} >
            <div className={'col-12'}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Type</th>
                        <th scope="col">Trade Type ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        blogs.map((item , index) =>(
                            <tr key={index}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.user.id}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td>{item.type}</td>
                                <td>{item.tradeType.id}</td>
                                <td><button className="btn btn-primary" onClick={()=>{
                                navigate(`/home/edit-blog/${item.id}`)}
                                }>Edit</button></td>
                                <td><button className="btn btn-primary" onClick={()=>handleDelete(item.id)}>Delete</button></td>

                            </tr>
                        ))
                    }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
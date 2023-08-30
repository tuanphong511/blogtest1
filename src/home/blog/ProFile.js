import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {deleteBlogs, getBlogs} from "../../services/blogService";

import {Link, useNavigate} from "react-router-dom";
import {login} from "../../services/userService";

export default function ListBlog (){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blogs = useSelector((state) => {
        return state.blogs.blogs
    })
    const user = useSelector(state => {
        return state.user.user.message.token
    })
    console.log(user)
    useEffect(() =>{
        dispatch(getBlogs())
    }, [])
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?")
        if (confirmDelete) {
            dispatch(deleteBlogs(id)).then(()=>{
                dispatch(getBlogs())
                navigate("/home")
            })
        }
    }


    return(
        <div>
            {blogs.map((item,key) =>{
                if (item.user.username === user.username){
                    return (
                        <div style={{marginTop:'100px', marginLeft:30 }} key={item.id} role="status" className=" w-full h-full p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700">
                            <div>
                                <div>
                                    <button
                                        onClick={()=>handleDelete(item.id)}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div style={{marginLeft:'730px'}}>
                                    <Link to={`/home/edit-blog/${item.id}`}>

                                        <button className=" focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path
                                                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                                <path
                                                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-center  mb-4">
                                <img src={item.image} width={700}/>
                            </div>
                            <div key={key} >
                                <div ><h1>{item.tittle}</h1></div>
                                <div style={{marginLeft:60}} ><h5>{item.content}</h5></div>
                            </div>
                            <div className="flex items-center mt-4 space-x-3">
                                <img style={{borderRadius: "50%", width: "60px", height: "60px"}} src={item.image} alt=""/>
                                <div>
                                    <div>{item.user.username}</div>
                                    <div>{item.date}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else return (<></>)
            })

            }


        </div>


    )
}
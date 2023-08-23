import {Link, useNavigate, useParams} from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateBlogs, getBlogs } from "../../services/blogService";
import {useEffect, useState} from "react";
import customAxios from "../../services/api";

export default function EditBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()
    console.log("id,",id)
    // const user = useSelector((state) => {
    //     return state.user.user;
    // });
    // const userId = user.message.token["idUser"];

    // Lấy thông tin blog từ Redux store
    // const blog = useSelector((state) => {
    //     return state.blog.currentBlog;
    // });
    const [blogs , setBlogs] = useState([])
    useEffect(()=>{
        customAxios(`/trades/${id}`).then((res)=>{
            setBlogs(res.data[0])
            }
        )
    },[])



    console.log(blogs)
    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <h1>Edit Blog</h1>
                <Formik initialValues={blogs}
                        enableReinitialize={true}
                    onSubmit={(values) => {
                        customAxios.put(`/trades/${id}`,values).then(()=>{
                            alert("da sua thanh cong")
                            navigate("/home")
                        })
                        // handleUpdate(values);
                    }}>
                    <Form>
                        <div className="offset-3 col-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Name</label>
                                <Field type="text" className={"form-control"} name={"name"} placeholder={"Name"}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Date</label>
                                <Field type="date" className={"form-control"} name={"date"} placeholder={"Date"}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Amount</label>
                                <Field type="text" className={"form-control"} name={"amount"} placeholder={"Amount"}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Type</label>
                                <Field type="text" className={"form-control"} name={"type"} placeholder={"Type"}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Trade Type</label>
                                <Field type="text" className={"form-control"} name={"tradeType"} placeholder={"tradeType"}/>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
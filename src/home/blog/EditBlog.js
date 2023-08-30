import {Link, useNavigate, useParams} from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateBlogs, getBlogs } from "../../services/blogService";
import {useEffect, useState} from "react";
import customAxios from "../../services/api";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";

export default function EditBlog() {
    // const { id} = useParams()
    // console.log(id)
    const [imageUpload, setImageUpload] = useState(null);
    const [percent, setPercent] = useState(0);
    const [urlFile, setUrlFile] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const uploadFile = () => {
        if (imageUpload == null) return;
        const storageRef = ref(storage, `/file/${imageUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageUpload);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const  percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent)
            },
            (err) => console.error(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrlFile(url);
                    setIsLoading(false)
                })
            }
        )
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams()


    const [blogs , setBlogs] = useState([])
    const [img,setImg]=useState("")
    useEffect(()=>{
        customAxios.get(`/blogs/${id}`).then((res)=>{
            setBlogs(res.data[0])
            setImg(res.data[0].image)
            }
        )
    },[])
    useEffect(() => {
        if (imageUpload) {
            setIsLoading(true);
            uploadFile()
        }
    }, [imageUpload]);

    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <h1>Edit Blog</h1>
                <Formik initialValues={blogs}
                        enableReinitialize={true}
                    onSubmit={(values,) => {

                        if (values.image === '') {
                            values.image = urlFile
                        } else if (urlFile === "") {
                            values.image = img
                        } else if(urlFile != img) {

                            values.image = urlFile
                        }
                        customAxios.put(`/blogs/${id}`,values).then(()=>{
                            console.log(values)
                            // values.image = urlFile
                            alert("da sua thanh cong")
                            navigate("/home")
                        })
                        // handleUpdate(values);
                    }}>

                    <Form>
                        <div style={{marginTop:"300px"}} className="offset-3 col-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Tittle</label>
                                <Field type="text" className={"form-control"} name={"tittle"} placeholder={"tittle"} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Content</label>
                                <Field type="text" className={"form-control"} name={"content"} placeholder={"content"}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Image</label>
                                <input type="file" className={"form-control"} name={"image"} placeholder={"tradeType"}
                                       onChange={(event) => {
                                           setImageUpload(event.target.files[0])
                                       }}
                                />
                            </div>
                            {isLoading && (
                                <div className="progress">
                                    <div className="progress-bar"
                                         role="progressbar"
                                         style={{width: `${percent}%`}}
                                         aria-valuenow={percent}
                                         aria-valuemin={0}
                                         aria-valuemax={100}>
                                        {percent}%
                                    </div>
                                </div>

                            )}

                            {urlFile && !isLoading && <img src={urlFile} alt=""/>}

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
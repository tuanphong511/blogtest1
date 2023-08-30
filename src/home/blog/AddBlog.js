import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addBlogs, getBlogs} from "../../services/blogService";
import {useEffect, useState} from "react";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
import {storage} from "../../firebase";

export default function AddBlog (){
    let a = JSON.parse(localStorage.getItem('user'))

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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => {
        return state.user.user
    })
    // const userId = user.message.token["idUser"]
    const handleAdd = (values) =>{
        values.image = urlFile
        let data ={...values,user : {id : a.message.token.idUser}}
        dispatch(addBlogs(data)).then((res) => {
            dispatch(getBlogs())
            navigate("/home")
        })
    }

    useEffect(() => {
        if (imageUpload) {
            setIsLoading(true);
            uploadFile()
        }
    }, [imageUpload]);
    return(
       <div className="pt-20" >
           <h1>Add blog</h1>
           <Formik initialValues={{ tittle:'', content:'', image:'',}} onSubmit={(values) =>{
               handleAdd(values)
           }}>
            <Form>
           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Tittle</label>
           <Field
               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               id="multiple_files" type="text" multiple
                name={"tittle"}
           />
           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Content</label>
           <Field
               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               id="multiple_files" type="text" multiple
                name={"content"}
           />
           {/*<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Date</label>*/}
           {/*<Field*/}
           {/*    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"*/}
           {/*    id="multiple_files" type="date" multiple*/}
           {/*    name={"date"}*/}
           {/*/>*/}

           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload
               multiple files</label>
           <input
               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               id="multiple_files" type="file" multiple
               name={"image"}
               onChange={(event) => {
                   setImageUpload(event.target.files[0])
               }}
           />
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
           <br/>
           <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload</button>
            </Form>
            </Formik>

       </div>

    )
}
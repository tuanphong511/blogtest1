
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import {register} from "../services/userService";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../firebase";

export default function Register() {
    console.log(1)
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

    const handleRegister = async (values) =>{
        values.image = urlFile
        let a =  await dispatch(register(values))
        console.log(a.payload.data)
        navigate("/")
    }
    useEffect(() => {
        if (imageUpload) {
            setIsLoading(true);
            uploadFile()
        }
    }, [imageUpload]);
    return (
        <Formik
            initialValues={{username: '', password: '', image:''}}
            onSubmit={(values) => {
            console.log(values)
            handleRegister(values)
            // navigate('/')

        }}>
            <Form>
                <div className="bg-white dark:bg-gray-900">
                    <div className="flex justify-center h-screen">
                        <div className="hidden bg-cover lg:block lg:w-2/3" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'}}>
                            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                                <div>
                                    <h2 className="text-4xl font-bold text-white">Facebook</h2>
                                    <p className="max-w-xl mt-3 text-gray-300">Chào mừng mọi người đến với Facebook phiên bản fake</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                            <div className="flex-1">
                                <div className="text-center">
                                    <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Facebook</h2>
                                    <p className="mt-3 text-gray-500 dark:text-gray-300">Sign up new account</p>
                                </div>
                                <div className="mt-8">

                                    <div>
                                        <label htmlFor="text" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                        <Field type="text" name={"username"} id="email" placeholder="username" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>

                                        </div>
                                        <Field type="password" name={"password"} id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div>
                                        <label htmlFor="text" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Image</label>
                                        <input type="file" name={"image"} id="image" placeholder=" Your Image"
                                               className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    </div>
                                    <div className="mt-6">
                                        {/*<Link to={"/"}>*/}
                                        <button type={"submit"} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                          Sign up
                                        </button>
                                        {/*</Link>*/}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

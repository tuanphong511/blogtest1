import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        let a =  await dispatch(login(values))
        console.log('a',a.payload.data.message)


        if(a.payload.data.message.token === "User is not exist"){
            alert("dang nhap ko thanh cong")
            navigate("/")
        }else if(a.payload.data.message.token ==="Password is wrong"){
            alert("sai mk")
            navigate("/")
        }
        else {
          await  dispatch(login(values))
            navigate("/home")
        }

    }


    return (
        <div className={'row'}>
            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={(values) => {
                    handleLogin(values).then((res)=>{
                        console.log(values,"valure")
                    })
                }}>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address/Username</label>
                            <Field type="text" className={'form-control'} name={'username'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <Field type="text" className={'form-control'} name={'password'}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {/*<button type="submit" className="ml-3 btn btn-secondary">Register</button>*/}
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
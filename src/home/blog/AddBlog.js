import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addBlogs, getBlogs} from "../../services/blogService";

export default function AddBlog (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => {
        return state.user.user
    })
    const userId = user.message.token["idUser"]
    const handleAdd = (values) =>{
        dispatch(addBlogs(values)).then((res)=>{
            dispatch(getBlogs()).then(()=>{
                navigate('/home')
            })

        })

    }
    return(
        <div className={'row'} >
            <div className={'col-12'}>
                <h1>Add Blogs</h1>
                <Formik initialValues={{userId:userId, name:'',date:'', amount:'',type:'',tradeType:"" }}
                        onSubmit={(values) =>{
                            handleAdd(values)
                }}>
                <Form>
                    <div className="offset-3 col-6">
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="exampleInputEmail1">User ID</label>*/}
                    {/*    <Field type="text" className={"form-control"} name={'userId'} placeholder={'User Id'}/>*/}

                    {/*</div>*/}
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <Field type="text" className={"form-control"} name={'name'} placeholder={'Name'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Date</label>
                        <Field type="date" className={"form-control"} name={'date'} placeholder={'Date'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Amount</label>
                        <Field type="text" className={"form-control"} name={'amount'} placeholder={'Amount'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Type</label>
                        <Field type="text" className={"form-control"} name={'type'} placeholder={'Type'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Trade Type</label>
                        <Field type="text" className={"form-control"} name={'tradeType'} placeholder={'tradeType'}/>
                    </div>

                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </Form>
                </Formik>
            </div>
        </div>
    )
}
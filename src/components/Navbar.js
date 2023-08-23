import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export default function Navbar() {
    const dispatch = useDispatch()
    const user = useSelector(state => {
        console.log(state.user.user)
        return state.user.user
    })
    console.log(user)

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to={''}>
                                        <a className="nav-link" >Home <span className="sr-only">(current)</span></a>
                                    </Link>

                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link to={'add-blog'}>
                                            <a className="dropdown-item">Add</a>
                                        </Link>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link disabled">Disabled</a>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                        <form className="form-inline my-2 my-lg-0">
                            {user.message.username}
                            <Link to={'/'}>
                                <button className="ml-3 btn btn-outline-danger my-2 my-sm-0">Log Out</button>
                            </Link>
                        </form>
                    </nav>
                </div>
            </div>

        </>
    )
}

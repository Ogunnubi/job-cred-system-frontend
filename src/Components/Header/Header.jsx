import "./Header.css";
// import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";


const Header = () => {


    return (    
        <nav style={{color: "black"}} className="navbar bg-white slow py-4 navbar-expand-md sticky-top divider">
            <div className="container-fluid px-5">

                <span className="navbar-brand">
                    {/* <img src="./Mustard logo new.png" className="img-fluid" alt="" style={{width: "150px"}} /> */}
                    <h6>WeWork</h6>
                </span>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">          
                        <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/jobs' className="nav-link">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Credits</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Dashboard</Link>
                        </li>
                    </ul>


                    {/* <a href="#login" className=""><i className="ri ri-lock-unlock-fill"></i> Login</a> */}
                    {/* <a href="#get-started" className="btn btn-brand ms-3">Getting Started <i style={{verticalAlign: "inherit"}} className="ri ri-arrow-right-line"></i></a> */}
                </div>
            </div>
        </nav>
    )
}

export default Header
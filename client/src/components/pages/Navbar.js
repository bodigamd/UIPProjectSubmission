import '../../App.css';

import {Outlet, Link} from "react-router-dom";

import UserContext from "../../Context/userContext";
import { useContext, Fragment } from "react";

const Navbar = () => {

  const { user } = useContext(UserContext);

  const authenticated = (
    <Fragment>
      <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/profile'>
                  Profile
          </Link>
              </li>
    </Fragment>
  )

  const guest = (
    <Fragment>
      <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
          </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
          </Link>
              </li>
    </Fragment>
  )


  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>
            Social Media App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            {user.authenticated ? authenticated : guest}
            </ul>
          </div>
        </div>
      </nav>
    <Outlet />
    </div>
  );
}

export default Navbar;
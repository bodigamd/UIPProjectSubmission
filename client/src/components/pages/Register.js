import '../../App.css';

import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    UserId: '',
    FirstName: '',
    LastName: '',
    password: ''
  });

  const { UserId, FirstName, LastName, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/register",
      {
        UserId,
        FirstName,
        LastName,
        password
      },
      "POST")
      .then((data) => {
        if (!data.message) {
          console.log(data)
          navigate("/login")
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <div className="App">
      <div className="signup-form">
        <form onSubmit={onSubmit}>
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p>
          <hr />
          <div className="form-group">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control" 
                  placeholder='User Id'
                  id="UserId"
                  name='UserId'
                  onChange={onChange}
                  value={UserId}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder='First Name'
                  id="FirstName"
                  name='FirstName'
                  onChange={onChange}
                  value={FirstName}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder='Last Name'
              id="LastName"
              name='LastName'
              onChange={onChange}
              value={LastName}
              required />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder='Password'
              id="password"
              name='password'
              onChange={onChange}
              value={password}
              required />
          </div>
          <div className="form-group">
            <label className="form-check-label">
              <input type="checkbox" required="required" /> I accept the{" "}
              <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Sign Up
      </button>
          </div>
        </form>
        <div className="hint-text">
          Already have an account? <Link to='/login'>Login here</Link>
        </div>
      </div>

    </div>
  );
}

export default Register;
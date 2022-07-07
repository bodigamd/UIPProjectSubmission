import '../../App.css';

import { fetchData } from "../../main.js";
import { useNavigate, Link } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../../Context/userContext.js";

const Login = () => {

  const navigate = useNavigate();

  const {user, updateUser} = useContext(UserContext);

  const {UserId, password} = user;  

  const onChange = (e) => updateUser(e.target.name, e.target.value)

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/login",
      {
        UserId,
        password
      },
      "POST")
      .then((data) => {
        console.log(data);
        if (!data.message) {
          updateUser("authenticated", true);
          fetchData("/post/viewpost",
            {
              UserId
            },
            "POST")
            .then((_data) => {
              console.log(_data);
              if (!_data.message) {
                navigate("/profile", { state: { name: UserId, data: _data } });
              }
            })
            .catch((error) => {
              console.log(error)
            })
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
          <h2>Log in</h2>
          <p>Please fill in this form to log in to your account!</p>
          <hr />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="UserId"
              name='UserId'
              id='UserId'
              onChange={onChange}
              value={UserId}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              name='password'
              onChange={onChange}
              value={password}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Log In
      </button>
          </div>
        </form>
        <div className="hint-text">
          New User? <Link to='register'>Register here</Link>
        </div>
      </div>

    </div>
  );
}

export default Login;

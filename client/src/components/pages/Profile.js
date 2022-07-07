import '../../App.css';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { useContext } from "react";
import UserContext from "../../Context/userContext.js";

const Profile = (props) => {
    const location = useLocation();

    const { user } = useContext(UserContext);

    let _data = [];

    for (let i = 0; i < Object.keys(location.state.data).length; i++) {
        _data.push({ _id: location.state.data[i]._id, title: location.state.data[i].PostName, pdate: location.state.data[i].PostDate, description: location.state.data[i].description });
    }

    const navigate = useNavigate();
    const [post, setPost] = useState({
        PostId: '',
        PostName: '',
        PostDate: '',
        description: ''
    });

    const { PostId, PostName, PostDate, description } = post;

    const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
        const UserId = location.state.name;
        fetchData("/post/create",
            {
                UserId,
                PostId,
                PostName,
                PostDate,
                description
            },
            "POST")
            .then((data) => {
                if (!data.message) {
                    console.log(data)
                    fetchData("/post/viewpost",
                        {
                            UserId
                        },
                        "POST")
                        .then((info) => {
                            console.log(info);
                            if (!info.message) {
                                setPost({PostId: '',
                                PostName: '',
                                PostDate: '',
                                description: ''
                                });
                                navigate("/profile", { state: { name: UserId, data: info } });
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
        <div className="container mt-5 login">
            <h1 className="h1-main">{location.state.name}</h1>
            <h2>Your Posts</h2>
            {_data.map(cont => (
                <li>{cont.pdate}, {cont.title}, {cont.description}  
                    <br /></li>
            ))}

            <div className="signup-form">
                <form onSubmit={onSubmit}>
                    <h2>New Post</h2>
                    <p>Please fill in this form to create a new post!</p>
                    <hr />
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='PostId'
                                    id="PostId"
                                    name='PostId'
                                    onChange={onChange}
                                    value={PostId}
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Post Name'
                                    id="PostName"
                                    name='PostName'
                                    onChange={onChange}
                                    value={PostName}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Post Date'
                            id="PostDate"
                            name='PostDate'
                            onChange={onChange}
                            value={PostDate}
                            required />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="description"
                            name='description'
                            placeholder='Description'
                            onChange={onChange}
                            value={description}
                            required>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label">
                            <input type="checkbox" required="required" /> I accept the{" "}
                            <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Create
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Profile;
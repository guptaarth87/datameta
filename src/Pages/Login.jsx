import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin1' && password === 'password1') {
            setLoggedIn(true);
            navigate('/home');
        } else {
            setError('Incorrect username or password');
        }
    };


    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <form onSubmit={handleLogin}>
                        <h3 className="mb-4">Login</h3>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { React, useState } from "react";
import axios from "axios";


function LoginComponent({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/token/', { username, password })
            .then(response => {
                console.log(response.data);
                onLogin(response.data.access_token);
            })
            .catch(error => {
                console.error("Login error:", error);
            });
    }

    return (
        <div>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginComponent;
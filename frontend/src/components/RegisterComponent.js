import axios from "axios";
import { React, useState } from "react";

function RegisterComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        axios.post('http://127.0.0.1:8000/register/', { username, password })
            .then(response => {
                console.log(response.data);
                alert("Registered successfully");
            })
            .catch(error => {
                console.error("Registration error:", error);
            });
    }

    return (
        <div>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterComponent;
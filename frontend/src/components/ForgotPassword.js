import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = () => {
        axios.post("/forgot-password/", { email })
            .then(response => {
                setMessage("Password reset email sent. Please check your inbox.");
            })
            .catch(error => {
                setMessage("An error occurred. Please try again later.");
            });
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={handleForgotPassword}>Reset Password</button>
            <p>{message}</p>
        </div>
    );
}

export default ForgotPassword;

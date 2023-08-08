import React, { useState } from "react";
import axios from "axios";

function ResetPassword({ match }) {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = () => {
        const token = match.params.token;
        axios.post("/reset-password/", { token, newPassword })
            .then(response => {
                setMessage("Password reset successful. You can now log in with your new password.");
            })
            .catch(error => {
                setMessage("An error occurred. Please try again later.");
            });
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <input type="password" placeholder="Enter your new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <button onClick={handleResetPassword}>Reset Password</button>
            <p>{message}</p>
        </div>
    );
}

export default ResetPassword;

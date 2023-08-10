import React, { useState } from "react";
import axios from "axios";

function ResetPassword({ token }) {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);


    const handleResetPassword = () => {
        const requestData = {
            token: token,
            new_password: newPassword,
        };

        axios.post("http://127.0.0.1:8000/reset-password/", requestData)
            .then(response => {
                setSuccess(true);
                setMessage("Password reset successful. You can now log in with your new password.");
            })
            .catch(error => {
                if (error.response && error.response.data && Array.isArray(error.response.data.detail)) {
                    const detailedErrorMessage = error.response.data.detail.map(err => `${err.loc.join('.')} - ${err.msg}`).join('; ');
                    setMessage(detailedErrorMessage);
                } else {
                    setMessage("An unexpected error occurred. Please try again later.");
                }
            });

    };

    return (
        success ? (<p>{message}</p>) : (
            <div>
                <h2>Reset Password</h2>
                <input type="password" placeholder="Enter your new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <button onClick={handleResetPassword}>Reset Password</button>
                <p>{message}</p>
            </div>
        )
    );
}

export default ResetPassword;

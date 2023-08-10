import React, { useState } from "react";
import axios from "axios";
import ButtonComponent from "./ButtonComponent";

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(`http://127.0.0.1:8000/forgot-password/?email=${email}`)
            .then(response => {
                console.log(response);
                setMessage("Password reset email sent. Please check your inbox.");
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else {
                    console.log("Error:", error.message);
                }
                setMessage("An error occurred. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200"> {/* This surrounds the card and centers it */}
            <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96">
                <h2 className="font-mono py-1 text-center">Forgot Password</h2>
                {message.length > 0 ? <p className="font-mono py-4 text-center mb-4 text-black-500 bg-gray-300 rounded border">{message}</p> : null}
                <input className="mb-4 p-2 w-full rounded border border-gray-300" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                <ButtonComponent onClick={handleForgotPassword} label="Reset Password" isLoading={isLoading}>Reset Password</ButtonComponent>
            </div>
        </div>
    );
}

export default ForgotPasswordComponent;

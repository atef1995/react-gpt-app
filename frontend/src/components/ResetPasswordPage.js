import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import axios from "axios";

const ResetPasswordPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [isValidToken, setIsValidToken] = useState(false);

    console.log("Token from useParams:", token);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/verify-reset-token?token=${token}`)
            .then(response => {
                setIsValidToken(true);
            })
            .catch(error => {
                setIsValidToken(false);
            });
    }, [token]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200"> {/* This surrounds the card and centers it */}
            <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96">
                <h2 className="font-mono py-4 text-center">Reset Password</h2>
                {isValidToken ? (
                    <ResetPassword token={token} />
                ) : (
                    <p>Invalid or expired token</p>
                )}
            </div>
        </div>
    );
}

export default ResetPasswordPage;

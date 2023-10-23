import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import LoginComponent from "./LoginComponent";

const Verification = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useParams();

    useEffect(() => {
        api.get(`/verify/${token}`)
            .then(response => {
                // Handle success
                setSuccess(true);
            })
            .catch(error => {
                // Handle error
                console.log(error);
                setErrorMessage(error.response.data.detail);
            }).finally(() => { setLoading(false); });
    }, [token]);

    if (loading) {
        return <div>Verifying...</div>;
    }

    if (success) {
        return <div className="p-5 text-center">Email successfully verified! You can now <Link to={'/login'} className="text-blue-500 hover:text-blue-300">log in.</Link></div>;
    }

    return (
        <div>
            {errorMessage && <div className="p-5 text-red-500 text-center">{errorMessage}</div>}
        </div>
    );
}

export default Verification;

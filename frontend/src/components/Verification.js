import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const Verification = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useParams();

    useEffect(() => {
        api.get(`/verify/${token}`)
            .then(response => {
                // Handle success
                console.log(`response: ${response.data}`);
                setLoading(false);
                setSuccess(true);
            })
            .catch(error => {
                // Handle error
                console.log(error);
                setLoading(false);
                setErrorMessage('Error verifying email. Please try again or contact support.');
            });
    }, [token]);

    if (loading) {
        return <div>Verifying...</div>;
    }

    if (success) {
        return <div>Email successfully verified! You can now log in.</div>;
    }

    return (
        <div>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
}

export default Verification;

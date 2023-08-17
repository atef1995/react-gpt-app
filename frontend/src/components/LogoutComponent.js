import { React, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Call the logout endpoint from your backend
        axios.post('http://127.0.0.1:8000/logout/')
            .then(response => {
                // Remove token or session info from local storage or wherever you've stored it
                localStorage.removeItem('token');

                // Redirect to login or another appropriate page
                navigate('/login');
            })
            .catch(error => {
                // Handle any errors during logout
                console.error('Error during logout:', error);
            });
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
}

export default LogoutComponent;

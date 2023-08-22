import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import AuthContext from '../authContext';

const LogoutComponent = () => {
    const { logOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');


    useEffect(() => {
        // Call the logout endpoint from your backend
        api.get('logout')
            .then(response => {
                if (response.status === 200) {
                    setMessage('Logged out');
                    logOut();
                }
            })
            .catch(error => {
                setMessage(error.message);
                // Handle any errors during logout
                console.error('Error during logout:', error);
            })
            .finally(() => logOut());
    }, []);

    return (
        <div>
            {message}
            <Navigate to='login' />
        </div>
    );
}

export default LogoutComponent;

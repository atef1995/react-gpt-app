import React, { useState, useEffect, useContext } from 'react';
import api from './api';
import { Navigate } from 'react-router-dom';
import { Spinner } from "@material-tailwind/react";
import AuthContext from './authContext';


const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(!isLoggedIn);

    console.log('Protected Route');
    console.log('beginning: isLoggedIn: ' + isLoggedIn + 'isLoading' + isLoading);

    useEffect(() => {
        api.get('verify-access-token/')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    // This means token is valid. You can optionally update the context here.
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isLoggedIn]);

    if (isLoading) {
        return <div className='flex items-center justify-center min-h-screen'><Spinner className='h-12 w-12' /></div>;
    }

    if (isLoggedIn) {
        return children;
    }

    return <Navigate to={"/login"} />;  // At this point, user will have been navigated away to /login.
}

export default ProtectedRoute;



// Start in a loading state (isLoading = true).
// Once the component mounts (useEffect), it'll attempt to verify the access token.
// If the token is valid, it'll set isAuthenticated to true.
// Once the API call finishes, it'll set isLoading to false, triggering a re-render and rendering the appropriate route or redirect.
import { useState, useEffect } from 'react';
import api from './api';
import { Route, useNavigate } from 'react-router-dom';
import { Spinner } from "@material-tailwind/react";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('verifying access token****************');
        api.get('verify-access-token/')
            .then((response) => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    navigate('/ask');
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className='flex items-center justify-center min-h-screen'><Spinner className='h-12 w-12' /></div>;
    }
    if (!isAuthenticated) {
        navigate("/login");
        return <div className='flex items-center justify-center'><Spinner /></div> // This will render nothing while navigating
    }

    return <Route {...rest} element={<Element />} />;
}

export default ProtectedRoute;

// Start in a loading state (isLoading = true).
// Once the component mounts (useEffect), it'll attempt to verify the access token.
// If the token is valid, it'll set isAuthenticated to true.
// Once the API call finishes, it'll set isLoading to false, triggering a re-render and rendering the appropriate route or redirect.
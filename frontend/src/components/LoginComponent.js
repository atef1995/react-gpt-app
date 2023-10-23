import { React, useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import ButtonComponent from "./ButtonComponent";
import AuthContext from "../authContext";
import api from "../api";


function LoginComponent() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { logIn, isLoggedIn } = useContext(AuthContext);


    const handleLogin = (data) => {
        const { email, password } = data;
        setIsLoading(true);
        setErrorMessage("");
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        api.post('login/', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                setMessage("Login successful")
                logIn();
            })
            .catch(error => {
                let errMsg = error?.response?.data?.detail
                    ? `Login error: ${error.response.data.detail}`
                    : 'An unexpected error occurred';

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

                setErrorMessage(errMsg);
            })
            .finally(() => setIsLoading(false));
    }


    return (
        isLoggedIn ? <Navigate to={'/'} />
            :
            <div className="h-screen w-full flex items-center justify-center bg-gray-200"> {/* This surrounds the card and centers it */}
                <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96"> {/* w-96 sets a fixed width, adjust as needed */}

                    <form className="w-full"> {/* Make the form take the full width of the card */}
                        <h1 className="font-mono py-4 text-center">Login Form</h1>
                        {
                            errorMessage
                                ? <p className="mb-4 p-2 font-mono text-center text-red-500">{errorMessage}</p>
                                : message
                                    ? <p className="mb-4 text-center font-mono text-green-300 bg-green-700 rounded border animate-bounce ">{message}</p>
                                    : null
                        }
                        {errors.email && <p className="animate-pulse text-black-500 text-red-500 text-center w-1/2 ml-20 mb-1">This field is required</p>}
                        <input className="mb-4 p-2 w-full rounded border border-gray-300" {...register('email', { required: true })} placeholder="Username or Email" />
                        {/* <input className="mb-4 p-2 w-full rounded border border-gray-300" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /> */}
                        {errors.password && <p className="animate-pulse text-red-500 text-center w-1/2 ml-20 mb-1">This field is required</p>}
                        <input className="mb-4 p-2 w-full rounded border border-gray-300" type="password" placeholder="Password" {...register('password', { required: true })} />
                        <div className="mb-3">

                            <a href="/forgot-password" className="font-mono text-blue-700 hover:text-blue-300 ">Forgot password?</a>
                        </div>
                        <ButtonComponent label="Login" isLoading={isLoading} onClick={handleSubmit(handleLogin)} />
                    </form>


                </div>
            </div>
    );
}

export default LoginComponent;
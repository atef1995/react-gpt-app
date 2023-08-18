import { React, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonComponent from "./ButtonComponent";
import AuthContext from "../authContext";
import api from "../api";


function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { logIn } = useContext(AuthContext);
    // const [accessToken, setAccessToken] = useState(null);
    // const navigate = useNavigate();



    const handleLogin = () => {
        console.log('Login Reached');

        setIsLoading(true);
        setErrorMessage("");
        const formData = new URLSearchParams();
        formData.append('username', email); // or use 'username'
        formData.append('password', password);

        api.post('login/', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log(response.data);
                setMessage("Login successful")

                logIn();
                // navigate('ask/');
            })
            .catch(error => {
                let errMsg = "Login error";  // Default message

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
        <div className="h-screen w-full flex items-center justify-center bg-gray-200"> {/* This surrounds the card and centers it */}
            <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96"> {/* w-96 sets a fixed width, adjust as needed */}

                <form className="w-full"> {/* Make the form take the full width of the card */}
                    <h1 className="font-mono py-4 text-center">Login Form</h1>
                    {
                        errorMessage
                            ? <p className="mb-4 font-mono text-center text-black-500 bg-red-500 rounded border">{errorMessage}</p>
                            : message
                                ? <p className="mb-4 text-center font-mono text-green-300 bg-green-700 rounded border animate-bounce ">{message}<a href="/login" className="text-blue-700 hover:text-blue-400">{"Login here."}</a></p>
                                : null
                    }
                    <input className="mb-4 p-2 w-full rounded border border-gray-300" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    {/* <input className="mb-4 p-2 w-full rounded border border-gray-300" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /> */}
                    <input className="mb-4 p-2 w-full rounded border border-gray-300" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <div className="mb-3">

                        <a href="/forgot-password" className="font-mono text-blue-700 hover:text-blue-300 ">Forgot password?</a>
                    </div>
                    <ButtonComponent label="Login" isLoading={isLoading} onClick={handleLogin} />
                </form>


            </div>
        </div>
    );
}

export default LoginComponent;
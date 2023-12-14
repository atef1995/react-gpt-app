import { React, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useForm } from 'react-hook-form'
import api from "../api";
import Layout from "../pages/Layout";

function RegisterComponent() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleRegister = (data) => {
        setIsLoading(true);
        const { email, username, password } = data;

        api.post('register', { email, username, password })
            .then(response => {
                setMessage("Registered successfully!");
            })
            .catch(error => {
                setMessage("")
                if (error.response && error.response.status === 400) {
                    // This means username already exists. Handle accordingly.
                    setErrorMessage("Username already exists.");
                    // Or you can set a state variable to display the error on your page
                    // this.setState({ registrationError: "Username already exists." });
                } else {
                    // Handle other types of errors or generic error message
                    setErrorMessage("An error occurred. Please try again.");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Layout >
            <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100"> {/* This surrounds the card and centers it */}
                <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96"> {/* w-96 sets a fixed width, adjust as needed */}
                    <h1 className="font-mono py-4">Registeration Form</h1>
                    <form className="w-full space-y-1" onSubmit={handleSubmit(handleRegister)}> {/* Make the form take the full width of the card */}
                        {
                            errorMessage
                                ? <p className="mb-4 font-mono text-center text-black-500 bg-red-500 rounded border ">{errorMessage}</p>
                                : message
                                    ? <p className="mb-4 text-center font-mono text-green-300 bg-green-700 rounded border animate-bounce ">{message}<a href="/login" className="text-blue-700 hover:text-blue-400">{"An email with a verification link was sent to you"}</a></p>
                                    : null
                        }
                        <div>
                            {errors.email && <p className="animate-pulse text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">This field is required</p>}
                            <input className="mb-4 p-2 w-full rounded border border-gray-300" {...register('email', { required: true })} placeholder="Email" />
                        </div>
                        <div>
                            {errors.username && (errors.username.type === 'required' ? <p className="animate-pulse text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">This field is required</p> : <p className="text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">Min 4 characters</p>)}
                            <input className="mb-4 p-2 w-full rounded border border-gray-300" {...register('username', { required: true, minLength: 4 })} placeholder="Username" />
                        </div>
                        <div>
                            {errors.password && (errors.password.type === 'required' ? <p className="animate-pulse text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20">This field is required</p> : <p className="text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">Min 8 characters</p>)}
                            <input className="mb-4 p-2 w-full rounded border border-gray-300 " {...register('password', { required: true, minLength: 8 })} placeholder="Password" type="password" />
                        </div>
                        {/* <input className="mb-4 p-2 w-full rounded border border-gray-300" name="password" placeholder="Verify Password" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required /> */}

                        <ButtonComponent label="Register" isLoading={isLoading} onClick={handleSubmit(handleRegister)} />
                    </form>

                </div>
            </div>
        </Layout>

    );
}

export default RegisterComponent;
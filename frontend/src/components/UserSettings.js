import api from "../api";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form"
import ButtonComponent from "./ButtonComponent";
import AuthContext from "../authContext";

export default function UserSettings() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Fetch the current user details
        api.get('/current-user-details')
            .then(response => {
                console.log(response)
                // Assuming response.data contains the current user's details
                const { username, email, apikey } = response.data;
                setValue("username", username);
                setValue("email", email);
                setValue("apikey", apikey);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
    }, []);

    const handleRegister = (data) => {
        const { username, email, password, apikey } = data;

        api.put('/update', { username, email, password, apikey }
        ).then((response) => {
            if (response.status === 200) {
                console.log(response);
                setMessage(response.data.detail);
                setOnSuccess(true);
            }
        })
            .catch((error) => { setMessage(error.response.data.detail) })
            .finally(() => { setIsLoading(false) });
    };


    return (
        isLoggedIn &&
        <div className="h-screen w-full flex items-center justify-center bg-gray-200"> {/* This surrounds the card and centers it */}
            <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96"> {/* w-96 sets a fixed width, adjust as needed */}
                <h1 className="font-mono py-4">Edit profile</h1>
                {onSuccess ? <p className="mb-4 text-center text-blue-500 font-mono">{message}</p> :

                    <form className="w-full space-y-1" onSubmit={handleSubmit(handleRegister)}>
                        {
                            message && (<p className="mb-4 text-center text-blue-500 font-mono">{message}</p>)
                        }
                        <div>
                            {errors.email && <p className="animate-pulse text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">This field is required</p>}
                            <input className="mb-4 p-2 w-full rounded border border-gray-300" {...register('email', { required: true })} placeholder="Email" />

                            {errors.username && (errors.username.type === 'required' ? <p className="animate-pulse text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">This field is required</p> : <p className="text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">Min 4 characters</p>)}
                            <input className="mb-4 p-2 w-full rounded border border-gray-300" {...register('username', { required: true, minLength: 4 })} placeholder="Username" />

                            {errors.password && (errors.password.type === 'required' ? <p className="animate-pulse text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20">This field is required</p> : <p className="text-black-500 bg-red-500 rounded border text-center w-1/2 ml-20 mb-1">Min 8 characters</p>)}
                            <input className="mb-4 p-2 w-full rounded border border-gray-300 " {...register('password', { required: true, minLength: 8 })} placeholder="Password" type="password" />
                            {errors.apikey && <p className='bg-red-400 text-center'>{errors.apikey.message}</p>}
                            <input
                                type="password"
                                className="mb-4 p-2 w-full rounded border border-gray-300"
                                {...register('apikey', {
                                    required: true,
                                    minLength: {
                                        value: 32,  // replace 32 with the actual minimum length requirement
                                        message: "API key must be at least 32 characters" // replace 32 with the actual minimum length requirement
                                    }
                                })}
                                placeholder="API Key"
                            />
                        </div>
                        {/* <input className="mb-4 p-2 w-full rounded border border-gray-300" name="password" placeholder="Verify Password" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required /> */}

                        <ButtonComponent type="submit" label="Submit" isLoading={isLoading} onClick={handleSubmit(handleRegister)} />
                    </form>
                }
            </div>
        </div>
    )

}
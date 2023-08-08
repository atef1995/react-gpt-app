import axios from "axios";
import { React, useState } from "react";
import ButtonComponent from "./ButtonComponent";

function RegisterComponent() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!username || !password || !verifyPassword || !email) {
            setErrorMessage("Please fill in all the fields.");
            setIsLoading(false);
            return;
        }

        if (password !== verifyPassword) {
            setErrorMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        axios.post('http://127.0.0.1:8000/register/', { email, username, password })
            .then(response => {
                setErrorMessage("");
                console.log(response.data);
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
        <div className="h-screen w-full flex items-center justify-center bg-gray-200"> {/* This surrounds the card and centers it */}
            <div className="flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 w-96"> {/* w-96 sets a fixed width, adjust as needed */}
                <h1 className="font-mono py-4">Registeration Form</h1>

                <form className="w-full"> {/* Make the form take the full width of the card */}
                    {
                        errorMessage
                            ? <p className="mb-4 font-mono text-center text-black-500 bg-red-500 rounded border">{errorMessage}</p>
                            : message
                                ? <p className="mb-4 text-center font-mono text-green-300 bg-green-700 rounded border animate-bounce ">{message}<a href="/login" className="text-blue-700 hover:text-blue-400">{"Login here."}</a></p>
                                : null
                    }
                    <input className="mb-4 p-2 w-full rounded border border-gray-300" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input className="mb-4 p-2 w-full rounded border border-gray-300" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                    <input className="mb-4 p-2 w-full rounded border border-gray-300" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <input className="mb-4 p-2 w-full rounded border border-gray-300" type="password" placeholder="Verify Password" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required />

                    <ButtonComponent label="Register" isLoading={isLoading} onClick={handleRegister} />
                </form>

            </div>
        </div>

    );
}

export default RegisterComponent;
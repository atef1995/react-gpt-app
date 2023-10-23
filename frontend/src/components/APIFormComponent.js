import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useForm, Controller } from 'react-hook-form';

const APIFormComponent = () => {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('http://localhost:8000/current-user-details');
        if (response.data.apikey) {
          setHasApiKey(true);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleApi = async (data) => {
    const { apiKey, file, modelChoice } = data;
    setLoading(true); // start loading
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('model_choice', modelChoice);
    if (!hasApiKey) {
      await api.post(`/set-api-key/?api_key=${apiKey}`, apiKey)
        .then((response) => {
          setMessage("Success api");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
    }

    await api.post('upload/', formData)
      .then(response => {
        setMessage("Success!");
        navigate('/ask');
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(setLoading(false));
  };


  return (
    <div className="flex items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <form className="mt-8 space-y-2" onSubmit={handleSubmit(handleApi)}>
        {
          errorMessage
            ? <p className="mb-4 font-mono text-center text-black-500 bg-red-500 rounded border">{errorMessage}</p>
            : message
              ? <p className="mb-4 text-center font-mono text-green-300 animate-bounce ">{message}</p>
              : <h1 className='text-center'>Fill in the fields</h1>
        }
        <React.Fragment>
          {!hasApiKey && (
            <>
              {errors.apiKey && <p className='bg-red-400 text-center'>{errors.apiKey.message}</p>}
              <input
                id="API-Key"
                name="apiKey"
                type="password"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 drop-shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register('apiKey', {
                  required: true,
                  minLength: {
                    value: 32,  // replace 32 with the actual minimum length requirement
                    message: "API key must be at least 32 characters" // replace 32 with the actual minimum length requirement
                  }
                })}
                placeholder="API Key"
              />
            </>
          )}
          {errors.file && <p className='text-red-400 text-center'>{errors.file.message}</p>}
          <input
            id="Upload-PDF"
            name="file"
            type="file"
            // accept="application/pdf"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 drop-shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            {...register("file", {
              validate: value => value[0]?.type === "application/pdf" || "Please upload a PDF file"
            })}
          />

          {errors.modelChoice && <p className='text-red-400 text-center'>{errors.modelChoice.message}</p>}
          {/* <label htmlFor="Model-Choice" className="sr-only">Model Choice</label> */}
          <Controller
            name="modelChoice"
            control={control}
            defaultValue=""
            rules={{ required: 'This field is required' }}
            render={({ field, fieldState }) => (
              <select
                {...field}
                id="Model-Choice"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 drop-shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">--Please choose an option--</option>
                <option value="gpt-3">GPT-3</option>
                <option value="gpt-4">GPT-4</option>
              </select>
            )}
          />

          <div className="flex flex-col items-center">
            <button type="submit" className="transition ease-in-out delay-150 group relative w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 drop-shadow-lg">
              {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Submit
            </button>
          </div >
        </React.Fragment>


      </form>
    </div>
  );



};

export default APIFormComponent;

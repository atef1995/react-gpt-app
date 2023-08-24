import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api';


const APIFormComponent = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [modelChoice, setModelChoice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // start loading

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('model_choice', modelChoice);
    // formData.append('api_key', apiKey);

    api.post('/set-api-key/?api_key=${apiKey}', apiKey)
      .then((response) => { console.log(response.message); })
      .catch((error) => { console.log(error.message); })

    api.post('upload/', formData)
      .then(response => {
        console.log(response.data);
        navigate('/ask');
        return response.data;
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="API-Key" className="sr-only">API Key</label>
              <input id="API-Key" name="API Key" type="text" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 drop-shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="API Key" value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
            <div>
              <label htmlFor="Upload-PDF" className="sr-only">Upload PDF</label>
              <input id="Upload-PDF" name="Upload PDF" type="file" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 drop-shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Upload PDF" onChange={handleFileChange} />
            </div>
            <div>
              <label htmlFor="Model-Choice" className="sr-only">Model Choice</label>
              <select id="Model-Choice" name="Model Choice" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-gray-900 drop-shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={modelChoice} onChange={e => setModelChoice(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="gpt3">GPT-3</option>
                <option value="GPT-4">GPT-4</option>
                {/* Add other options as needed */}
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="transition ease-in-out delay-150 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 drop-shadow-lg">
              {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Submit
            </button>

          </div>
        </form>
      </div>
    </div>
  );



};

export default APIFormComponent;

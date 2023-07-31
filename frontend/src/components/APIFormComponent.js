import React, { useState } from 'react';

const APIFormComponent = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [modelChoice, setModelChoice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission.
    // You might send a request to your backend, for example.
    console.log(apiKey, selectedFile, modelChoice);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="flex  min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="API-Key" className="sr-only">API Key</label>
              <input id="API-Key" name="API Key" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="API Key" value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
            <div>
              <label htmlFor="Upload-PDF" className="sr-only">Upload PDF</label>
              <input id="Upload-PDF" name="Upload PDF" type="file" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Upload PDF" onChange={handleFileChange} />
            </div>
            <div>
              <label htmlFor="Model-Choice" className="sr-only">Model Choice</label>
              <select id="Model-Choice" name="Model Choice" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={modelChoice} onChange={e => setModelChoice(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="model1">Model 1</option>
                <option value="model2">Model 2</option>
                {/* Add other options as needed */}
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
  
};

export default APIFormComponent;

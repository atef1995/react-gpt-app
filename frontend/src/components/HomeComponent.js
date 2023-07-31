import React from 'react';
import APIFormComponent from './APIFormComponent'

function HomeComponent() {
    return (
    <div >
      <div className='text-center text-3xl  mt-6 mb-6 '><h1>Welcome to PDF to GPT</h1></div>
      <p className='text-center bg-gray-50 text-blue-700'><a href='https://beta.openai.com/account/api-keys' target="_blank" rel="noopener noreferrer">Get your api key</a></p>
      
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><APIFormComponent /></div>
      {/* Other components or functionalities can go here */}
    </div>    
    );
}

export default HomeComponent;

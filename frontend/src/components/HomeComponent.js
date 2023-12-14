import React, { useContext } from 'react';
import APIFormComponent from './APIFormComponent'
import AuthContext from '../authContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Layout from '../pages/Layout';

function HomeComponent() {
  const { isLoggedIn } = useContext(AuthContext);


  return (
    isLoggedIn ?
      (
        <Layout>
          <div className='bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 ' >
            <div className='text-center text-3xl font-semibold tracking-wide py-6'>
              <h1 className='text-blue-500 antialiased font-sans font-light tracking-wide leading-loose'>Welcome to PDF to GPT</h1>
            </div>

            <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10">
              <div className='mb-4'>
                <APIFormComponent />
              </div>


              <div className="max-w-4xl mx-auto p-8 md:p-12 my-12 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-500 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-6 text-center">How to Use</h2>
                <div className="flex items-center justify-center mb-4 ml-4">
                  <a href="https://beta.openai.com/account/api-keys" className="inline-block mt-4 lg:mt-0 text-black-200 hover:text-blue-500 mr-4 " target="_blank" rel="noopener noreferrer">
                    <Button variant="gradient" className='p-2 text-black'>Get your API key</Button>
                  </a>
                </div>

                <ol className="text-gray-700">
                  <li className="mb-2">
                    <b>Step 1:</b> Enter your OpenAI API key. You can get one from the <a href='https://beta.openai.com/account/api-keys' target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">OpenAI API keys page</a>.
                  </li>
                  <li className="mb-2">
                    <b>Step 2:</b> Upload a PDF file that you want to transform into GPT-3 or GPT-4 language.
                  </li>
                  <li className="mb-2">
                    <b>Step 3:</b> Choose the model you prefer between GPT-3 and GPT-4.
                  </li>
                  <li className="mb-2">
                    <b>Step 4:</b> Click 'Submit' to process the PDF with the selected model.
                  </li>
                  <li className="mb-2">
                    <b>Step 5:</b> Wait for the result. This could take a few moments depending on the length of the PDF.
                  </li>
                  <li className="mb-2">
                    <b>PS.</b> You can choose the model you prefer without uploading a PDF file.
                  </li>
                </ol>
              </div>

            </div>

            {/* Other components or functionalities can go here */}
          </div>
        </Layout>
      ) : <Navigate to='/login' />
  );
}

export default HomeComponent;

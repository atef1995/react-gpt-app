import React from "react";

function QuestionForm({ register, handleSubmit, loading, scroll }) {
    return (
        <div className="flex flex-col items-center justify-center w-full sticky bottom-0 mt-4 bg-blue-200/70 rounded-md p-3">
            <form onSubmit={handleSubmit} className="flex items-center justify-center md:w-1/2 lg:w-3/4">
                <input
                    {...register('question')}
                    type="text"
                    placeholder="Ask your question..."
                    className="flex-grow flex-shrink  min-w-0 md:w-1/2 lg:w-3/4 p-2 rounded-md border-2 border-gray-300 mr-5"
                    disabled={loading}
                    required
                // style={{ maxWidth: 'calc(100% - 100px)' }}
                />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded-md focus:cursor-wait hover:bg-blue-500">
                    Submit
                </button>
            </form>
            <button onClick={scroll} className='sm:absolute  right-1 bottom-1 sm:bottom-auto sm:right-1 mt-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6 hover:stroke-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
    );
}

export default QuestionForm;

import React from "react";

function QuestionForm({ register, handleSubmit, loading }) {
    return (
        <div className="flex flex-col items-center justify-center w-full sticky bottom-0 mt-4 bg-blue-200/70 rounded-md p-3">
            <form onSubmit={handleSubmit} className="flex items-center justify-center md:w-1/2 lg:w-3/4">
                <input
                    {...register('question')}
                    type="text"
                    placeholder="Ask your question..."
                    className="flex-grow flex-shrink  min-w-0 md:w-1/2 lg:w-3/4 p-2 rounded-md border-2 border-gray-300 mr-5"
                    disabled={loading}
                // style={{ maxWidth: 'calc(100% - 100px)' }}
                />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded-md">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default QuestionForm;

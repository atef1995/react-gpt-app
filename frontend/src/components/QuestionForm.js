import React from "react";

function QuestionForm({ question, setQuestion, submitQuestion }) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md">
            <form onSubmit={submitQuestion} className="flex justify-center mx-auto max-w-4xl">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask your question..."
                    className="flex-grow flex-shrink mr-4 p-2 rounded-md border-2 border-gray-300"
                    style={{ maxWidth: 'calc(100% - 100px)' }}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default QuestionForm;

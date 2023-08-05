import React from "react";

function ConversationHistory({ conversation }) {
    return (
        <div className="my-4 px-4 sm:px-0 max-w-4xl w-full sm:w-3/4 mx-auto">
            <h2 className="mt-10">Conversation History</h2>
            {conversation.map((pair, index) => (
                <div key={index} className="mb-4">
                    <p className="font-bold text-blue-600">Q: {pair.question}</p>
                    <p className="text-gray-700">A: {pair.answer}</p>
                </div>
            ))}
        </div>

    );
}


export default ConversationHistory;
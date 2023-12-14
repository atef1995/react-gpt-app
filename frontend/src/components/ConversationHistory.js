import React from "react";
import ReactMarkdown from "react-markdown";
// import { Markup } from "react-render-markup";
import Markdown from 'react-markdown'

function ConversationHistory({ conversation }) {
    return (
        <div className="my-4 px-4 sm:px-0 max-w-4xl w-full sm:w-3/4 mx-auto space-y-3 ">
            <h2 className="mt-10 py-10 text-center">Conversation History</h2>
            {conversation.map((pair, index) => (

                <div key={index} className="mb-4 space-y-2 w-full">
                    <div className="prose max-w-none p-3 bg-blue-300/25 w-full rounded shadow-md">
                        <p className="font-mono font-sans ml-2">Q: {pair.question}</p>
                    </div>
                    {pair.isError ? (<p className="text-red bg-red-500 rounded p-1">{pair.answer}</p>) : (
                        <div className="prose max-w-none p-3 bg-gray-100 w-full rounded shadow-md ">
                            {console.log(typeof (pair.answer))}
                            <Markdown>{pair.answer}</Markdown>

                        </div>)}

                </div>
            ))}
        </div>

    );
}


export default ConversationHistory;
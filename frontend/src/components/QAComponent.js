import React, { useState } from 'react';
import SummaryDisplay from './SummaryDisplay';
import QuestionForm from './QuestionForm';
import ConversationHistory from './ConversationHistory';
import api from '../api';
import { Spinner } from "@material-tailwind/react";

function QAComponent() {
    const [summary, setSummary] = useState('');
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([
    ]);

    async function submitQuestion(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post('/ask/', { question });
            if (response.status === 200) {
                const newConversationEntry = { question: question, answer: response.data.response };
                console.log(response.data); // Make sure this is the data structure you expect
                setConversation(prevConversation => [...prevConversation, newConversationEntry]);
                setQuestion('');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 md:p-12 lg:p-24 flex flex-col items-center justify-center relative">  {/* relative is NEW */}

            {loading && (  // NEW
                <div className="flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner color="blue" />
                </div>
            )}

            <div className={`w-full flex flex-col items-center justify-center flex-shrink-0 ${loading ? 'blur-md' : ''} z-0`}> {/* blur is NEW */}
                {/* <SummaryDisplay summary={summary} /> */}
                <QuestionForm
                    question={question}
                    setQuestion={setQuestion}
                    submitQuestion={submitQuestion}
                />
                <ConversationHistory conversation={conversation} />
            </div>
        </div>
    );
}

export default QAComponent;

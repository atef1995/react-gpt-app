import React, { useState, useRef } from 'react';
import SummaryDisplay from './SummaryDisplay';
import QuestionForm from './QuestionForm';
import ConversationHistory from './ConversationHistory';
import api from '../api';
import { Spinner } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';

function QAComponent() {
    const bottomRef = useRef(null);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([
    ]);

    const { register, handleSubmit, setValue } = useForm();

    async function submitQuestion(data) {
        const { question } = data;
        try {
            setLoading(true);
            const response = await api.post('/ask/', { question });
            if (response.status === 200) {
                const newConversationEntry = { question: question, answer: response.data.response };
                console.log(response.data); // Make sure this is the data structure you expect
                setConversation(prevConversation => [...prevConversation, newConversationEntry]);
                setValue('question', '');  // This will clear the form input
            }
        } catch (error) {
            console.error('An error occurred:', error);
            const errorMessage = "Something went wrong, check and re-enter your API key and try again."
            setConversation([...conversation, { question, answer: errorMessage, isError: true }]);
        } finally {
            setLoading(false);
        }
    }

    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="min-h-screen p-6 md:p-1 lg:p-3 flex flex-col items-center justify-center relative bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100">
            {/* <SummaryDisplay summary={summary} /> */}
            <ConversationHistory conversation={conversation} />

            <QuestionForm
                register={register}
                handleSubmit={handleSubmit(submitQuestion)}
                loading={loading}
                scroll={scrollToBottom}
            />

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Spinner color="blue" />
                </div>
            )}
            <div ref={bottomRef}></div>
        </div>
    );
}

export default QAComponent;

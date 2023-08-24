import React, { useState, useEffect } from 'react';
import SummaryDisplay from './SummaryDisplay';
import QuestionForm from './QuestionForm';
import ConversationHistory from './ConversationHistory';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import api from '../api';


function QAComponent() {
    const [summary, setSummary] = useState('');
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([
        { question: "Mock Question 1?", answer: "Mock answer 1." },
        { question: "Mock Question 2?", answer: "Mock answer 2." },
        { question: "Mock Question 1?", answer: "Mock answer 1." },
        { question: "Mock Question 2?", answer: "Mock answer 2." },
    ]);

    async function submitQuestion(e) {
        e.preventDefault();
        // call your API, pass `question` as a parameter
        try {
            const response = await api.post('ask/', { question });
            if (response.status === 200) {
                setConversation(prevConversation => [...prevConversation, response.data]);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);

        }
    }

    // async function updateConversation() {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:5000/ask');
    //         if (response.status === 200) {
    //             setConversation(response.data.qa_pairs);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // useEffect(() => {
    //     // make an API call to get the summary when the page loads
    //     // and store it in `summary`
    // }, []);




    return (
        // Your component code here...
        <div className="p-6 md:p-12 lg:p-24 flex flex-col items-center justify-center">
            <SummaryDisplay summary={summary} />
            <QuestionForm
                question={question}
                setQuestion={setQuestion}
                submitQuestion={submitQuestion}
            />
            <ConversationHistory conversation={conversation} />
        </div>
    );
}


export default QAComponent;

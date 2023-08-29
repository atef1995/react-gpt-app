import React from "react";

function SummaryDisplay({ summary }) {

    return (
        <div className="my-4 px-4 sm:px-0 w-full sm:w-3/4 max-w-4xl mx-auto rounded-xl">
            <h2>Summary of document:</h2>
            <h3 className="text-2xl font-semibold">{summary}</h3>
        </div>
    );
}


export default SummaryDisplay;
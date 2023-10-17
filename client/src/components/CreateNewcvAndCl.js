import React, { useState } from "react";

export const CreateNewcvAndCl = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfData, setPdfData] = useState(null);

    const generateNewCv = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/generate-cv-coverLetter");

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            setPdfData(data)
            console.log(data);
            console.log(pdfData)
            console.log("New CV generated successfully!");
        } catch (err) {
            setError("An error occurred while generating the CV. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={generateNewCv} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate New CV"}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CreateNewcvAndCl;

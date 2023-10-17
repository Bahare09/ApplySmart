import React, { useState } from "react";
import PdfViewer from "./PdfViewer"; // Import the PdfViewer component

export const CreateNewcvAndCl = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfData, setPdfData] = useState(null); // State to store PDF data

    const generateNewCv = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/generate-cv-coverLetter");

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Set the PDF data when it's received
            setPdfData(data
            );

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
            {pdfData && <PdfViewer pdfData={pdfData} />} {/* Render PdfViewer when pdfData is available */}
        </div>
    );
};

export default CreateNewcvAndCl;

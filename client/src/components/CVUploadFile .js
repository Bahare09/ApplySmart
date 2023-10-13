import React, { useState } from "react";

function CVUploadFile() {
  // State to hold the selected CV file
  const [selectedCV, setSelectedCV] = useState(null);

  // Function to handle CV file upload
  const handleCVUpload = async () => {
    // Check if a CV file is selected
    if (!selectedCV) {
      alert("Please select a CV file to upload.");
      return;
    }

    // Create a FormData object to send the CV file
    const formData = new FormData();
    formData.append("cv", selectedCV);

    try {
      // Send a POST request to the backend with the CV file
      const response = await fetch("http://localhost:4000/upload-cv ", {
        method: "POST",
        body: formData,
      });

      // Check if the response is successful
      if (response.ok) {
        alert("CV uploaded successfully!");
        // Clear the selectedCV state after successful upload
        setSelectedCV();
      } else {
        alert("CV upload failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to handle changes in the CV file input
  const handleCVChange = (e) => {
    const file = e.target.files[0];
    setSelectedCV(file);
  };

  // Render the component's UI
  return (
    <div>
      <h3>Upload your CV (PDF)</h3>
      <input
        type="file"
        accept=".pdf" // Allow only PDF files to be selected
        onChange={handleCVChange} // Call handleCVChange when the file input changes
      />
      <button onClick={handleCVUpload}>Upload</button>
    </div>
  );
}

export default CVUploadFile;

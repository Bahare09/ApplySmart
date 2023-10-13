import React, { useState } from "react";

function UploadFile({ onFileUpload, fileType }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile, fileType); // Pass the selected file and type
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <h3>Upload {fileType === "cv" ? "CV" : "Job Description"} (PDF)</h3>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default UploadFile;

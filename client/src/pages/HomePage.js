import React, { useState } from "react";
import SubmitText from "../components/SubmitText";
import UploadFile from "../components/UploadFile";

function HomePage({ handleFileUpload, handleTextSubmit }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileUploadWrapper = async (file, fileType) => {
    setIsUploading(true); // Set uploading to true before starting upload
    await handleFileUpload(file, fileType);
    setIsUploading(false); // Set uploading to false after upload completion
  };

  const handleTextSubmitWrapper = async (text, fileType) => {
    setIsUploading(true); // Set uploading to true before starting text submit
    await handleTextSubmit(text, fileType);
    setIsUploading(false); // Set uploading to false after text submit completion
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="text">Submit Text</option>
        <option value="file">Upload File</option>
      </select>

      {isUploading && <p>Loading...</p>}

      {selectedOption === "text" && !isUploading && (
        <SubmitText onTextSubmit={handleTextSubmitWrapper} fileType="cv" />
      )}

      {selectedOption === "file" && !isUploading && (
        <UploadFile onFileUpload={handleFileUploadWrapper} fileType="cv" />
      )}
    </div>
  );
}

export default HomePage;

import React, { useState } from "react";
import SubmitText from "../components/SubmitText";
import UploadFile from "../components/UploadFile";
import "./jobListingpage.css"

function HomePage({ handleFileUpload, handleTextSubmit, loading }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="text">Submit Text</option>
          <option value="file">Upload File</option>
        </select>
        {selectedOption === "text" && (
          <SubmitText onTextSubmit={handleTextSubmit} fileType="cv" />
        )}
        {selectedOption === "file" && (
          <UploadFile onFileUpload={handleFileUpload} fileType="cv" />
        )}
      </div>
      {loading ? <div className="loading"><p>Loading...</p></div> : ""}
    </div>
  );
}
export default HomePage;
import React from "react";
import SubmitText from "../components/SubmitText";
import UploadFile from "../components/UploadFile";

function HomePage({ handleFileUpload, handleTextSubmit }) {
  return (
    <div>
      <UploadFile onFileUpload={handleFileUpload} fileType="cv" />
      <SubmitText onTextSubmit={handleTextSubmit} fileType="cv" />
    </div>
  );
}

export default HomePage;

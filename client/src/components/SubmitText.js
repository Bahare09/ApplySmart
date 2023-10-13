import React, { useState } from "react";

function SubmitText({ onTextSubmit, fileType }) {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmitText = () => {
    if (text) {
      // Pass the text and type to the callback
      onTextSubmit(text, fileType);
      // Clear the text input after submission
      setText("");
    } else {
      alert("Please enter text to submit.");
    }
  };

  return (
    <div>
      <h2>Submit {fileType === "cv" ? "CV" : "Job Description"} (Text)</h2>
      <textarea rows="4" cols="50" value={text} onChange={handleTextChange} />
      <button onClick={handleSubmitText}>Submit Text</button>
    </div>
  );
}

export default SubmitText;

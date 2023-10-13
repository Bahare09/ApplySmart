import React, { useState } from "react";

function CVSubmitText({ onTextSubmit }) {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmitText = () => {
    if (text) {
      onTextSubmit(text);
      // clear the text input after submission
      setText("");
    } else {
      alert("Please enter text to submit.");
    }
  };

  return (
    <div>
      <h2>Submit Text</h2>
      <textarea rows="4" cols="50" value={text} onChange={handleTextChange} />
      <button onClick={handleSubmitText}>Submit Text</button>
    </div>
  );
}

export default CVSubmitText;

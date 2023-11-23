import React, { useState } from "react";
import { Button, Input, Flex } from 'antd';

const { TextArea } = Input;

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
      <Flex align="center" gap='large' vertical>
        <TextArea
          style={{
            borderRadius: '2px',
            border: '1px solid var(--neutral-5, #D9D9D9)',
            background: 'var(--neutral-1, #FFF)',
            width: '100%',
            minHeight: '300px'
          }}
          text="Please insert your CV here"
          value={text}
          onChange={handleTextChange}
          size="medium"
          state='normal'
          filled='false' />
        <Button title="Submit" onClick={handleSubmitText} type="primary" size="large" shape="normal" state  >Submit</Button>

      </Flex>

    </div>
  );
}

export default SubmitText;

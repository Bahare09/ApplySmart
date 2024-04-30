import React, { useState } from "react";
import { Button, Input, Flex, Grid } from 'antd';
const { useBreakpoint } = Grid;

const { TextArea } = Input;

function SubmitText({ onTextSubmit, fileType }) {
  const [text, setText] = useState("");
  const breakpoints = useBreakpoint();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmitText = () => {
    if (text) {
      onTextSubmit(text, fileType);
      setText("");
    } else {
      alert("Please enter text to submit.");
    }
  };

  return (
    <Flex gap='large' vertical>
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
        filled='false'
        placeholder="Please insert your CV here"
      />
      <Flex align="flex-start" justify="end">
        <Button title="Submit" onClick={handleSubmitText} type="primary" size="large" shape="normal" state  style={{width:breakpoints.xs && "100%"}} >Submit</Button>
      </Flex>
    </Flex>
  );
}

export default SubmitText;

import React, { useState } from "react";
import SubmitText from "../components/SubmitText";
import UploadFile from "../components/UploadFile";
// ... other imports

import { Segmented } from 'antd';
import { Image, Flex } from 'antd';
import "./loadingCircle.css";
import graphic from "./images/Graphic.jpg"

function HomePage({ handleFileUpload, handleTextSubmit, loading }) {
  const [selectedOption, setSelectedOption] = useState('file');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Flex justify={"center"} align={"center"} gap={'small'} style={{ padding: '50px' }} flex={1}>
      <div>
        <Image

          src={graphic}
        />
      </div>

      {/* <Sider style={{ background: 'red' }}>Sider</Sider> */}
      <Flex justify={"center"} align={"center"} gap={'small'} vertical flex={1.5}>
        <div style={{ textAlign: 'center' }}>
          <h1>ApplySmart</h1>
          <p style={{
            textAlign: 'center', color: ' #000000d9',
            fontFamily: "Roboto-Medium",
            fontSize: '20px',
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: '28px',

          }}>Tailor your CV to align with the recommended job description,<br />
            Make your profile stand out among other candidates.</p>
        </div>

        <Flex style={{ width: '100%', textAlign: 'center' }} vertical gap={'middle'}>
          <Segmented defaultValue={selectedOption} onChange={handleOptionChange} size={"large"} block
            options={[
              { label: 'Submit text', value: 'text', size: 'large' },
              { label: 'Upload your CV file', value: 'file' },
            ]}
          />
          {selectedOption === "text" && (
            <SubmitText onTextSubmit={handleTextSubmit} fileType="cv" />
          )}
          {selectedOption === "file" && (
            <UploadFile onFileUpload={handleFileUpload} fileType="cv" />
          )}
          <div>
            {loading ? <div className="loading"><p>Loading...</p></div> : ""}
          </div>
        </Flex>




      </Flex>
    </Flex >

  );
}

export default HomePage;

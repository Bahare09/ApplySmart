import React, { useState } from "react";
import { Upload, Button, Flex } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
function UploadFile({ onFileUpload, fileType }) {


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (info) => {
    const fileList = [...info.fileList];

    // Only allow one file to be uploaded
    const file = fileList.length > 0 ? fileList[0].originFileObj : null;

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
      <Flex gap='large' vertical  >
        <Dragger
          name="file"
          multiple={false}
          accept=".pdf"
          onChange={handleFileChange}
          beforeUpload={() => false}
          style={{
            borderRadius: '2px',
            border: '1px solid var(--neutral-5, #D9D9D9)',
            background: 'var(--neutral-1, #FFF)',
            width: '100%',
            minHeight: '300px'
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibit from uploading company
            data or other band files.
          </p>
        </Dragger>

        {/* <input type="file" accept=".pdf" onChange={handleFileChange} /> */}

        <Button title="Submit" onClick={handleFileUpload} type="primary" size="large" shape="normal" state  >Submit</Button>
      </Flex>
    </div >
  );
}

export default UploadFile;

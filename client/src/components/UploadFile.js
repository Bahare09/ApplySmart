import React, { useState } from "react";
import { Upload, Button, Flex, Grid } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;

const { Dragger } = Upload;
function UploadFile({ onFileUpload, fileType }) {
  const breakpoints = useBreakpoint();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (info) => {
    const fileList = [...info.fileList];
    const file = fileList.length > 0 ? fileList[0].originFileObj : null;

    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile, fileType);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
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
          Support for a single upload. Strictly prohibit from uploading<br /> company
          data or other band files.
        </p>
      </Dragger>
      <Flex align="flex-start" justify="end">
        <Button title="Submit" onClick={handleFileUpload} type="primary" size="large" shape="normal" style={{width:breakpoints.xs && "100%"}} >Submit</Button>
      </Flex>

    </Flex >
  );
}

export default UploadFile;

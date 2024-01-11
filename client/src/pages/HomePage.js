import React, { useState } from "react";
import SubmitText from "../components/SubmitText";
import UploadFile from "../components/UploadFile";
import LoadingCircle from "../components/LoadingCircle";
import Graphic from "../components/Graphic";
import { Segmented, Flex, Typography } from "antd";
const { Title } = Typography;

function HomePage({ handleFileUpload, handleTextSubmit, loading }) {
  const [selectedOption, setSelectedOption] = useState("file");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Flex
      justify={"center"}
      align={"start"}
      gap={"small"}
      style={{ padding: "50px", justifySelf: "center" }}
    >
      <Graphic />

      <Flex
        justify={"center"}
        align={"center"}
        gap={"small"}
        vertical
        flex={1.5}
      >
        <Title level={4} style={{ textAlign: "center" }}>
          Tailor your CV to align with the recommended job description,
          <br />
          Make your profile stand out among other candidates.
        </Title>

        <Flex
          style={{ width: "100%", textAlign: "center" }}
          vertical
          gap={"middle"}
        >
          <Segmented
            defaultValue={selectedOption}
            onChange={handleOptionChange}
            size={"large"}
            block
            options={[
              { label: "Submit text", value: "text", size: "large" },
              { label: "Upload your CV file", value: "file" },
            ]}
          />
          {selectedOption === "text" && (
            <SubmitText onTextSubmit={handleTextSubmit} fileType="cv" />
          )}
          {selectedOption === "file" && (
            <UploadFile onFileUpload={handleFileUpload} fileType="cv" />
          )}

          {loading ? <LoadingCircle /> : ""}
        </Flex>
      </Flex>

    </Flex>
  );
}

export default HomePage;

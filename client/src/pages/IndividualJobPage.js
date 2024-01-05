import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Top from "../components/Top";
import { TailoredVersion } from "../components/TailoredVersion";
import SelectedJobDetails from "../components/SelectedJobDetails";

function IndividualJobPage({ resultData, handleFileUpload, handleTextSubmit }) {
  const cv = resultData.newCv;
  const coverLetter = resultData.coverLetter;
  const jobFit = resultData.jobFitForTailoredCv;

  return (
    <Flex
      gap="56px"
      style={{
        background: "var(--white, #FFF)",
        padding: "44px 68px",
        width: "Hug (1,340px)",
        height: "Hug (1,662px)",
      }}
      vertical
    >
      <Top
        handleFileUpload={handleFileUpload}
        handleTextSubmit={handleTextSubmit}
      />
      <Link to="/joblisting">
        <Button>
          <ArrowLeftOutlined />
          Back
        </Button>
      </Link>

      {/* Selected Job Section */}
      <Flex vertical gap="56px">
        <SelectedJobDetails resultData={resultData} />
        <TailoredVersion cv={cv} coverLetter={coverLetter} jobFit={jobFit} />
      </Flex>

    </Flex>
  );
}

export default IndividualJobPage;

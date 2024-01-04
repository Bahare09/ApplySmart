import React, { useState } from "react";
import { Button, Flex, Typography } from "antd";
import JobModal from "./JobModal"; // Import the JobModal component

const { Title } = Typography;

const SelectedJobDetails = ({ resultData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Flex vertical style={{ flex: 1 }} gap={"32px"}>
      <Title level={4}>Selected job</Title>
      <Flex gap={"16px"} justify="space-between" align="center">
        <div>
          {/* <Title level={4} style={{ margin: "0" }}>
            {resultData.title}
          </Title> */}
        </div>
        <div>
          <Button onClick={showModal}>View the job description</Button>
          <Button
            type="primary"
            onClick={() => window.open(resultData.url, "_blank")}
          >
            Apply on the job listing website
          </Button>
        </div>
      </Flex>

      {/* Job Description Modal */}
      <JobModal
        isOpen={isModalVisible}
        onClose={handleCancel}
        fullJobDescription={resultData.description}
        tailorCV={() => {
          // Function to tailor CV for the job
          console.log("Tailoring CV for this job");
        }}
      />
    </Flex>
  );
};

export default SelectedJobDetails;

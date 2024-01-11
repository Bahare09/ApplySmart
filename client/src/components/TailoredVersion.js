import React from "react";
import { Flex, Tabs, Typography, Alert } from "antd";
import DownloadCopySection from "./DownloadCopySection";

const { Title } = Typography;



export const TailoredVersion = ({ cv, coverLetter, jobFit }) => {
  return (
    <Flex
      gap="32px"

      vertical>
      <Title level={4}>The Tailor CV and Cover Letter</Title>

      {/* Tabs for CV, Cover Letter, and Job Fit */}
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"middle"}
        tabBarStyle={{ marginBottom: "32px" }}
        items={[
          {
            label: "CV",
            Title: "CV",
            key: "1",
            children: (
              <Flex gap="32px" vertical>
                <Alert message="Content is powered by OpenAI. Kindly review the content and
                    make any edits according to your preference." type="info" showIcon />
                <DownloadCopySection text={cv} fileName="cv.txt" title="CV" />
              </Flex>
            ),
          },
          {
            label: "Cover letter",
            Title: "Cover letter",
            key: "2",
            children: (
              <Flex gap="32px" vertical>
                <Alert message="Content is powered by OpenAI. Kindly review the content and
                    make any edits according to your preference." type="info" showIcon />
                <DownloadCopySection
                  text={coverLetter}
                  fileName="coverLetter.txt"
                  title="Cover Letter"
                />
              </Flex>
            ),
          },
          {
            label: "Job Fit",
            Title: "Job Fit",
            key: "3",
            children: (
              <Flex gap="32px" vertical>
                <Alert message="Content is powered by OpenAI. Kindly review the content and
                    make any edits according to your preference." type="info" showIcon />
                <DownloadCopySection text={jobFit} title="Job Fit" />
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  );
};

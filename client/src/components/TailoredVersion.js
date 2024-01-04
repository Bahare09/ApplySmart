import React from "react";
import { Tabs, Typography } from "antd";
import DownloadCopySection from "./DownloadCopySection";

const { Title, Text } = Typography;

const boxStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "8px",
  background: "#f0f6ff", // Very light blue
  color: "#000",
  border: "1px solid #1890ff", // Blue border
  marginBottom: "24px",
};

export const TailoredVersion = ({ cv, coverLetter, jobFit }) => {
  return (
    <div
      style={{
        flex: "1",
        width: "1440px",
        height: "1622px",
        top: "4px",
        gap: "32px",
      }}
    >
      <Title level={4}>The Tailor CV and Cover Letter</Title>

      {/* Tabs for CV, Cover Letter, and Job Fit */}
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"middle"}
        items={[
          {
            label: "CV",
            Title: "CV",
            key: "1",
            children: (
              <div>
                <div style={boxStyle}>
                  <Text>
                    Content is powered by OpenAI. Kindly review the content and
                    make any edits according to your preference.
                  </Text>
                </div>
                <DownloadCopySection text={cv} fileName="cv.txt" title="CV" />
              </div>
            ),
          },
          {
            label: "Cover letter",
            Title: "Cover letter",
            key: "2",
            children: (
              <div>
                <div style={boxStyle}>
                  <Text>
                    Content is powered by OpenAI. Kindly review the content and
                    make any edits according to your preference.
                  </Text>
                </div>
                <DownloadCopySection
                  text={coverLetter}
                  fileName="coverLetter.txt"
                  title="Cover Letter"
                />
              </div>
            ),
          },
          {
            label: "Job Fit",
            Title: "Job Fit",
            key: "3",
            children: (
              <div>
                <div style={boxStyle}>
                  <Text>
                    Content is powered by OpenAI. Kindly review the content and
                    make any edits according to your preference.
                  </Text>
                </div>
                <DownloadCopySection text={jobFit} title="Job Fit" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

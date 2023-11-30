import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import SubmitText from "../components/SubmitText";
import JobModal from "../components/JobModal";
import LoadingCircle from "../components/LoadingCircle";
import { Button, Dropdown, Space, Flex, List, Typography } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
const { Title, Paragraph, } = Typography;


function JobListingPage({
  handleFileUpload,
  handleTextSubmit,
  generateJobList,
  sendJobDescriptionToServer,
  sendJobDForView,
  jobList,
  fullJobDescription,
  loading,
}) {
  const [uploadOption, setUploadOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const handleUploadOptionChange = (option) => {
  //   setUploadOption(option);
  // };

  const items = [
    {
      label: <Button type="link" onClick={() => setUploadOption("file")}> Upload a job description file </Button>,
      key: '0',
    },
    {
      label: <Button type="link" onClick={() => setUploadOption("text")}> Submit the text for the job description</Button>,
      key: '1',
    },
  ];

  const renderUploadForm = () => {
    switch (uploadOption) {
      case "file":
        return <UploadFile onFileUpload={handleFileUpload} fileType="job" />;
      case "text":
        return <SubmitText onTextSubmit={handleTextSubmit} fileType="job" />;
      default:
        return null;
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleViewButtonClick = (redirectUrl) => {
    sendJobDForView(redirectUrl);
    openModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await generateJobList();
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="jobListingPage">
      <Flex gap="56px" style={{ background: "var(--white, #FFF)", padding: "44px 68px", width: "Hug (1,340px)", height: "Hug (1,662px)" }} vertical>
        <Flex justify="end" vertical>
          <Flex justify="space-between">
            <Title level={2} size={"medium"}>Tailor CV</Title>
            <Space>
              <Link to="/">
                <Button type="link" size="medium" title="Update your CV">Update your CV</Button>
              </Link>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <Button type="link" onClick={(e) => setUploadOption(null)}>
                  <Space>
                    Tailor CV for a specific job
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </Flex>
          <Paragraph disabled >Based on your CV, we’ve recommended the following job opportunities.<br /> Please select the one you’re interested in, then we will tailor your CV based for the job description</Paragraph>
        </Flex>

        {renderUploadForm()}
        {isLoading ? (
          <p>Loading...</p>
        ) : jobList.length > 0 ? (
          <Flex gap="32px" vertical>
            <Space>
              <Title level={3} size={"medium"}>Recommended jobs</Title>
            </Space>
            <List
              itemLayout='horizantal'
              dataSource={jobList}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
                align: "center",
                position: "bottom"
              }}
              renderItem={(item, index) => (
                <List.Item
                >
                  <Content>
                    <Flex gap="16px" style={{ position: "relative" }} align="flex-start" >
                      <Title level={5} style={{ flex: "1", alignItems: "flex-start", margin: "0" }}>{item.title}</Title>
                      <Flex gap={"24px"} align="flex-start" style={{ position: "relative", display: "inline-flex" }}>
                        <Button onClick={() => handleViewButtonClick(item.redirect_url)}> Quick view</Button>
                        <Button type="primary" onClick={() => sendJobDescriptionToServer(item.redirect_url)}> Tailor CV for this job</Button>
                      </Flex>
                    </Flex>
                    <Title level={5}>Salary:{item.salary_min}</Title>
                    <Paragraph>{item.description}</Paragraph>
                  </Content>
                </List.Item>
              )}
            />
          </Flex>

        ) : (
          <p>No jobs available.</p>
        )}
        <JobModal
          isOpen={isModalOpen}
          onClose={closeModal}
          fullJobDescription={fullJobDescription}
        />
      </Flex>
      {loading ? <LoadingCircle /> : ""}
    </div >
  );
}

export default JobListingPage;

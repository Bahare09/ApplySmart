import React, { useEffect, useState } from "react";
import JobModal from "../components/JobModal";
import LoadingCircle from "../components/LoadingCircle";
import Top from "../components/Top"
import { Button, Space, Flex, List, Typography } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        <Top handleFileUpload={handleFileUpload}
          handleTextSubmit={handleTextSubmit} />
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

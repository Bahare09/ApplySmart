import React from "react";
import { Button, Flex, Typography, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const SelectedJobDetails = ({ resultData }) => {
	return (
		<Flex vertical style={{ flex: 1 }} gap={"32px"}>
			<Title level={4}>Selected job</Title>
			<Flex gap={"16px"} vertical>
				<Flex justify="space-between">
					<Title level={4} style={{ margin: "0" }}>Title</Title>
					<Button >Apply on the job listing website</Button>
				</Flex>
				<Text>Salary:</Text>
				<Flex vertical>
					{resultData.description.trim().split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
					{resultData.url && (
						<Space>
							<Button type="link" icon={<LinkOutlined />} style={{ padding: "0" }}>
								<a href={resultData.url} target="_blank" rel="noopener noreferrer" alt="job link">
									View job (open a new tab)
								</a>
							</Button>
							<Text type="secondary" style={{ alignSelf: "center" }}>
								You will be redirected to Adzuna, a job ads website.
							</Text>
						</Space>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default SelectedJobDetails;

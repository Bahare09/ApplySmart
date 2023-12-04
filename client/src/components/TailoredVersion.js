import React from "react";
import { Tabs, Flex, Typography } from "antd";
import DownloadCopySection from "./DownloadCopySection";

const { Title } = Typography;

export const TailoredVersion = ({ cv, coverLetter }) => {
	return (
		<Flex style={{ flex: "1" }} vertical>
			<Title level={4}>The Tailor CV and Cover Letter</Title>
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
							<DownloadCopySection
								text={cv}
								fileName="cv.txt"
								title="CV"
							/>
						)
					},
					{
						label: "Cover letter",
						Title: "Cover letter",
						key: "2",
						children: (
							<DownloadCopySection
								text={coverLetter}
								fileName="coverLetter.txt"
								title="Cover Letter"
							/>
						)
					}
				]}
			/>
		</Flex>
	);
};

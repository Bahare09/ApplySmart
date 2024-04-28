import { useState } from "react";
import { Link } from "react-router-dom";
import UploadFile from "./UploadFile";
import SubmitText from "./SubmitText";
import { Flex, Space, Dropdown, Button, Typography, Grid } from "antd";
import { DownOutlined } from '@ant-design/icons';
const { Title, Paragraph, } = Typography;
const { useBreakpoint } = Grid;

function Top({ handleFileUpload,
    handleTextSubmit }) {
    const [uploadOption, setUploadOption] = useState(null);
    const breakpoints = useBreakpoint();

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

    return (
        <Flex justify="end" gap="8px" vertical>
            <Flex justify="space-between" style={{flexDirection: !breakpoints.md && "column"}} >
                <Title level={2} size={"medium"} style={{margin:"0"}}>Tailor CV</Title>
                <Space direction={breakpoints.xs &&"vertical"}>
                    <Link to="/">
                        <Button type="link" size="medium" title="Update your CV" style={{paddingLeft: !breakpoints.md && 0 }}>Update your CV</Button>
                    </Link>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <Button type="link" style={{paddingLeft: !breakpoints.md && 0 }} onClick={(e) => setUploadOption(null) }>
                            <Space>
                                Tailor CV for a specific job
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Space>
            </Flex>
            <Paragraph disabled >Based on your CV, we’ve recommended the following job opportunities.<br /> Please select the one you’re interested in, then we will tailor your CV based for the job description</Paragraph>
            {renderUploadForm()}
        </Flex>
    )

}

export default Top
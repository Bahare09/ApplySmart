import React from "react";
import { Flex, Typography, Button, message, Space } from "antd";
import { CopyOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;

const DownloadCopySection = ({ text, fileName, title }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
            .then(() => message.success('Text copied to clipboard'))
            .catch(() => message.error('Failed to copy text'));
    };

    const handleDownload = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        message.success('Text downloaded');
    };

    return (
        <>
            <Flex justify="space-between">
                <Title level={5} size={"medium"}>{title}</Title>
                <Space>
                    <Button onClick={handleDownload}>Download Text</Button>
                    <Button type="primary" onClick={handleCopy}>Copy Text</Button>
                </Space>
            </Flex>
            <Paragraph>
                {text.split('\n\n').map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                ))}
            </Paragraph>
            <Space>
                <Button type="link" onClick={handleCopy} icon={<CopyOutlined />} />
                <Text style={{ color: "#1890FF" }}>Copy the text</Text>
            </Space>
        </>
    );
};

export default DownloadCopySection;

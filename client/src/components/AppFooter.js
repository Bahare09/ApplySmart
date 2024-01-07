import React from "react";
import { Layout, Flex, Divider, Button, Typography, } from "antd";

const { Text } = Typography;
const { Footer } = Layout;

const AppFooter = () => {
  const layoutStyle = {
    backgroundColor: "rgba(255, 255, 255, 1)",
    gap: "26px"
  };

  const footerStyle = {
    backgroundColor: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontSize: "12px",
  };

  const openGoogleForm = () => {
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSe4AuCBsy2Ax4uPzuoZ60o84iTWbMrEs7Uf90GYPrxKhVzrfw/viewform?usp=sf_link";
    window.open(googleFormUrl, "_blank");
  };

  return (
    <Layout style={layoutStyle}>
      <Flex justify="center" align="center" vertical>
        <Divider horizontal>  We'd like to hear what you think about your experience.</Divider>
        <Button onClick={openGoogleForm}>
          Send us feedback
        </Button>
      </Flex>
      <Footer style={footerStyle}>
        <Text style={footerStyle} disabled>@All rights reserved ApplySmart</Text>
      </Footer>
    </Layout>
  );
};

export default AppFooter;

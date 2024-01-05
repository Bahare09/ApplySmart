import React from "react";
import { Button, Typography } from "antd";

const { Text } = Typography;

const Footer = () => {
  const footerStyle = {
    width: "1440px",
    height: "166px",
    position: "absolute",
    top: "858px",
    padding: "0px 0px 24px 0px",
    textAlign: "center",
  };

  const lineStyle = {
    width: "100%",
    height: "1px",
    background: "#ccc",
    margin: "12px 0",
  };

  const textStyle = {
    fontSize: "18px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    marginTop: "12px",
  };

  const rightsReservedStyle = {
    fontSize: "14px",
    marginTop: "12px",
  };

  const openGoogleForm = () => {
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSe4AuCBsy2Ax4uPzuoZ60o84iTWbMrEs7Uf90GYPrxKhVzrfw/viewform?usp=sf_link";
    window.open(googleFormUrl, "_blank");
  };

  return (
    <div style={footerStyle}>
      <div style={lineStyle}></div>
      <Text style={textStyle}>
        We'd like to hear what you think about your experience.
      </Text>
      <div style={lineStyle}></div>
      <Button style={buttonStyle} type="primary" onClick={openGoogleForm}>
        Send us feedback
      </Button>
      <div style={lineStyle}></div>
      <Text style={rightsReservedStyle}>@All rights reserved ApplySmart</Text>
    </div>
  );
};

export default Footer;

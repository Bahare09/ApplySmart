import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"
import Top from "../components/Top";

function IndividualJobPage({ resultData, handleFileUpload,
  handleTextSubmit }) {
  return (
    <Flex gap="56px" style={{ background: "var(--white, #FFF)", padding: "44px 68px", width: "Hug (1,340px)", height: "Hug (1,662px)" }} vertical>
      <Top handleFileUpload={handleFileUpload}
        handleTextSubmit={handleTextSubmit} />
      <Link to="/joblisting">
        <Button><ArrowLeftOutlined />Back</Button>
      </Link>
      <div>
        <p>Job Description</p>
        <div>{resultData.description.trim().split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      </div>
      <div>
        <h2>cover Letter</h2>
        <div>{resultData.coverLetter.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      </div>
      <div>
        <h2>Tailored CV</h2>
        <div>{resultData.newCv.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      </div>
      <div>
        <h2>JobFit</h2>
        <p>{resultData.jobFitForTailoredCv}</p>
      </div>
      {resultData.url && <button><a href={resultData.url} target="blank" alt="job link">Apply</a> </button>}

    </Flex>
  );
}


export default IndividualJobPage;
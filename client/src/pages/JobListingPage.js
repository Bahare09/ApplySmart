import React from "react";
import UploadFile from "../components/UploadFile";
import SubmitText from "../components/SubmitText";
import GenerateJobButton from "../components/GenerateJobButton";
import ChooseButton from "../components/ChooseButton";

function JobListingPage({
  handleFileUpload,
  handleTextSubmit,
  generateJobList,
  sendJobDescriptionToServer,
  jobList,
}) {
  return (
    <div>
      <h1>Job Description Page</h1>
      <UploadFile onFileUpload={handleFileUpload} fileType="job" />
      <SubmitText onTextSubmit={handleTextSubmit} fileType="job" />
      <GenerateJobButton
        onClick={() => {
          generateJobList();
        }}
      />
      <ul>
        {jobList.map((job, index) => (
          <li key={index}>
            <h2>{job.title}</h2>
            <h4>salary: {job.salary_min}</h4>
            <p>{job.description}</p>
            <p>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Redirect to {job.redirect_url}
              </a>
            </p>

            <ChooseButton
              onClick={() => sendJobDescriptionToServer(job.description)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobListingPage;

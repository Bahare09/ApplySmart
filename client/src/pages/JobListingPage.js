import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import SubmitText from "../components/SubmitText";
import ChooseButton from "../components/ChooseButton";

function JobListingPage({
  handleFileUpload,
  handleTextSubmit,
  generateJobList,
  sendJobDescriptionToServer,
  jobList,
}) {
  const [uploadOption, setUploadOption] = useState(null);

  const handleUploadOptionChange = (option) => {
    setUploadOption(option);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Fetching job list...");
        await generateJobList();
        // console.log("Job list fetched successfully");
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Job Description Page</h1>
      <Link to="/">
        <button>Upload New CV</button>
      </Link>

      {/* Select dropdown for choosing upload option */}
      <label htmlFor="uploadOption">Choose Upload Option:</label>
      <select
        id="uploadOption"
        onChange={(e) => handleUploadOptionChange(e.target.value)}
        value={uploadOption || ""}
      >
        <option value="">Select...</option>
        <option value="file">Upload File</option>
        <option value="text">Submit Text</option>
      </select>

      {/* Render the selected upload form */}
      {renderUploadForm()}
      {jobList.length > 0 ? (
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
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}

export default JobListingPage;

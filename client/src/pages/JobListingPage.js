import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import SubmitText from "../components/SubmitText";
import ChooseButton from "../components/ChooseButton";
import ViewButton from "../components/ViewButton";
import JobModal from "../components/JobModal";
function JobListingPage({
  handleFileUpload,
  handleTextSubmit,
  generateJobList,
  sendJobDescriptionToServer,
  sendJobDForView,
  jobList,
  fullJobDescription,
}) {
  const [uploadOption, setUploadOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        await generateJobList();
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
              <ChooseButton
                onClick={() => sendJobDescriptionToServer(job.redirect_url)}
              />
              {/* Pass the handleViewButtonClick function to the ViewButton */}
              <ViewButton
                onClick={() => handleViewButtonClick(job.redirect_url)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available.</p>
      )}
      {/* Job Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={closeModal}
        fullJobDescription={fullJobDescription}
      />
    </div>
  );
}
export default JobListingPage;

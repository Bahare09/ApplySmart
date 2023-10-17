import { useState } from "react";
import SubmitText from "./components/SubmitText";
import UploadFile from "./components/UploadFile";
import GenerateJobButton from "./components/GenerateJobButton";

function App() {
  const [jobList, setJobList] = useState([]);

  const handleFileUpload = async (file, fileType) => {
    if (file && fileType) {
      try {
        // Send a POST request to the backend with the file and type
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileType); // Set the type field

        const response = await fetch(
          "https://applysmart.onrender.com/upload-file",
          {
            method: "POST",
            body: formData,
          }
        );

        // Check if the response is successful
        if (response.ok) {
          alert(
            `${
              fileType === "cv" ? "CV" : "Job Description"
            } uploaded successfully!`
          );
        } else {
          alert(
            `${fileType === "cv" ? "CV" : "Job Description"} upload failed.`
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert(
        `Please select a ${
          fileType === "cv" ? "CV" : "Job Description"
        } file to upload.`
      );
    }
  };

  const handleTextSubmit = async (text, type) => {
    if (text && type) {
      try {
        // Send a POST request to the backend with the text data and type
        const response = await fetch(
          "https://applysmart.onrender.com/submit-text",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, type }), // Include the type
          }
        );

        // Check if the response is successful
        if (response.ok) {
          alert(
            `${
              type === "cv" ? "CV" : "Job Description"
            } submitted successfully!`
          );
        } else {
          alert(
            `${type === "cv" ? "CV" : "Job Description"} submission failed.`
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please enter text and select a type to submit.");
    }
  };
  const generateJobList = async () => {
    try {
      const response = await fetch("http://localhost:4000/generate-job-list");

      if (response.ok) {
        const data = await response.json();
        setJobList(data.jobList);
      } else {
        console.error("Failed to fetch job list");
      }
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  return (
    <div className="App">
      <UploadFile onFileUpload={handleFileUpload} fileType="cv" />
      <SubmitText onTextSubmit={handleTextSubmit} fileType="cv" />
      <UploadFile onFileUpload={handleFileUpload} fileType="job" />
      <SubmitText onTextSubmit={handleTextSubmit} fileType="job" />
      <h1>Generate Job List</h1>
      <GenerateJobButton onClick={generateJobList} />
      <ul>
        {jobList.map((job, index) => (
          <li key={index}>
            <h2>{job.title}</h2>
            <h4>salary: {job.salary_min}</h4>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

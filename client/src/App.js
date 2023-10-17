import { useState } from "react";
import SubmitText from "./components/SubmitText";
import UploadFile from "./components/UploadFile";
import GenerateJobButton from "./components/GenerateJobButton";
import ChooseButton from "./components/ChooseButton";
import CreateNewcvAndCl from "./components/CreateNewcvAndCl";

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
      const response = await fetch(
        "https://applysmart.onrender.com/generate-job-list"
      );

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
  const sendJobDescriptionToServer = async (jobDescription) => {
    if (jobDescription) {
      try {
        const response = await fetch(
          "https://applysmart.onrender.com/save-job-description",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ description: jobDescription }),
          }
        );

        if (response.ok) {
          alert("Job description saved successfully!");
        } else {
          alert("Failed to save job description.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please select a job and enter a job description.");
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
            <ChooseButton
              onClick={() => {
                sendJobDescriptionToServer(job.description);
              }}
            />
          </li>
        ))}
      </ul>
      <CreateNewcvAndCl />
    </div>
  );
}

export default App;

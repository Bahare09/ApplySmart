import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import CVPage from "./pages/CVPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import Result from "./pages/Result";

function App() {
  const [jobList, setJobList] = useState([]);
  const navigate = useNavigate();

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

          // Navigate based on the fileType
          if (fileType === "cv") {
            navigate("/job-description");
          } else {
            navigate("/result");
          }
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
      navigate("/");
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
            `${type === "cv" ? "CV" : "Job Description"} uploaded successfully!`
          );

          // Navigate based on the fileType
          if (type === "cv") {
            navigate("/job-description");
          } else {
            navigate("/result");
          }
        } else {
          alert(`${type === "cv" ? "CV" : "Job Description"} upload failed.`);
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
          navigate("/result");
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
      <Routes>
        <Route
          path="/"
          element={
            <CVPage
              handleFileUpload={handleFileUpload}
              handleTextSubmit={handleTextSubmit}
            />
          }
        />
        <Route
          path="/job-description"
          element={
            <JobDescriptionPage
              handleFileUpload={handleFileUpload}
              handleTextSubmit={handleTextSubmit}
              generateJobList={generateJobList}
              sendJobDescriptionToServer={sendJobDescriptionToServer}
              jobList={jobList} // Pass the jobList as a prop
            />
          }
        />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;

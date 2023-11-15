import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import JobListingPage from "./pages/JobListingPage";
import IndividualJobPage from "./pages/IndividualJobPage";

function App() {
  const [jobList, setJobList] = useState([]);
  const [resultData, setResultData] = useState([]);
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
            navigate("/jobListing");
          } else {
            const data = await response.json();
            setResultData(data);
            navigate("/individualJob");
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
            navigate("/jobListing");
          } else {
            const data = await response.json();
            setResultData(data);
            navigate("/individualJob");
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
  const sendJobDescriptionToServer = async (jobRedirectURL) => {
    if (jobRedirectURL) {
      try {
        const response = await fetch(
          "https://applysmart.onrender.com/individualJob",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Url: jobRedirectURL }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setResultData(data);
          alert("Job selected successfully!");
          navigate("/individualJob");
        } else {
          alert("Failed to select job.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please select a job or enter a job description.");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleFileUpload={handleFileUpload}
              handleTextSubmit={handleTextSubmit}
            />
          }
        />
        <Route
          path="/jobListing"
          element={
            <JobListingPage
              handleFileUpload={handleFileUpload}
              handleTextSubmit={handleTextSubmit}
              generateJobList={generateJobList}
              sendJobDescriptionToServer={sendJobDescriptionToServer}
              jobList={jobList} // Pass the jobList as a prop
            />
          }
        />
        <Route
          path="/individualJob"
          element={<IndividualJobPage resultData={resultData} />}
        />
      </Routes>
    </div>
  );
}

export default App;

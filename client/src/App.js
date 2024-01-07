import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListingPage from "./pages/JobListingPage";
import IndividualJobPage from "./pages/IndividualJobPage";
import apiUrl from "./api";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import { Layout } from "antd";
const { Content } = Layout

function App() {
  const [jobList, setJobList] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [fullJobDescription, setFullJobDescription] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleFileUpload = async (file, fileType) => {
    if (file && fileType) {
      try {
        setloading(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileType); // Set the type field
        const response = await fetch(apiUrl + "/upload-file", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          alert(
            `${fileType === "cv" ? "CV" : "Job Description"
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
      } finally {
        setloading(false)
      }
    } else {
      alert(
        `Please select a ${fileType === "cv" ? "CV" : "Job Description"
        } file to upload.`
      );
      navigate("/");
    }
  };
  const handleTextSubmit = async (text, type) => {
    if (text && type) {
      try {
        setloading(true)
        // Send a POST request to the backend with the text data and type
        const response = await fetch(apiUrl + "/submit-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, type }),
        });
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
      } finally {
        setloading(false)
      }
    } else {
      alert("Please enter text and select a type to submit.");
    }
  };
  const generateJobList = async () => {
    try {
      const response = await fetch(apiUrl + "/generate-job-list");
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
        setloading(true);
        console.log(loading)
        const response = await fetch(apiUrl + "/individualJob", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Url: jobRedirectURL }),
        });
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
      } finally {
        setloading(false)
      }
    } else {
      alert("Please select a job or enter a job description.");
    }
  };
  const sendJobDForView = async (redirectUrl) => {
    try {
      setloading(true);
      const response = await fetch(apiUrl + "/sendJobDForView", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Url: redirectUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        setFullJobDescription(data.fullJobDescription)
      } else {
        console.error("Failed to fetch full job description");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setloading(false)
    }
  };
  return (
    <div className="App">
      <Layout style={{ backgroundColor: "rgba(250, 250, 250, 1)", gap: "32px" }}>
        <AppHeader />
        <Content style={{ padding: "0 52px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  handleFileUpload={handleFileUpload}
                  handleTextSubmit={handleTextSubmit}
                  loading={loading}
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
                  jobList={jobList}
                  sendJobDForView={sendJobDForView}
                  fullJobDescription={fullJobDescription}
                  loading={loading}
                />
              }
            />
            <Route
              path="/individualJob"
              element={<IndividualJobPage resultData={resultData} handleFileUpload={handleFileUpload}
                handleTextSubmit={handleTextSubmit} />}
            />
          </Routes>
        </Content>
        <AppFooter />
      </Layout>
    </div>
  );
}
export default App;

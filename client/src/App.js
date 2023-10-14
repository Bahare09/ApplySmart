import SubmitText from "./components/SubmitText";
import UploadFile from "./components/UploadFile";

function App() {
  const handleFileUpload = async (file, fileType) => {
    if (file && fileType) {
      try {
        // Send a POST request to the backend with the file and type
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileType); // Set the type field

        const response = await fetch("https://applysmart.onrender.com/upload-file", {
          method: "POST",
          body: formData,
        });

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
        const response = await fetch("https://applysmart.onrender.com/submit-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, type }), // Include the type
        });

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

  return (
    <div className="App">
      <UploadFile onFileUpload={handleFileUpload} fileType="cv" />
      <SubmitText onTextSubmit={handleTextSubmit} fileType="cv" />
      <UploadFile onFileUpload={handleFileUpload} fileType="job" />
      <SubmitText onTextSubmit={handleTextSubmit} fileType="job" />
    </div>
  );
}

export default App;

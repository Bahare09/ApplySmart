import SubmitText from "./components/SubmitText";
import UploadFile from "./components/UploadFile ";

function App() {
  const handleFileUpload = async (file) => {
    if (file) {
      try {
        // Send a POST request to the backend with the CV file
        const formData = new FormData();
        formData.append("cv", file);

        const response = await fetch("http://localhost:4000/upload-cv ", {
          method: "POST",
          body: formData,
        });

        // Check if the response is successful
        if (response.ok) {
          alert("CV uploaded successfully!");
        } else {
          alert("CV upload failed.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please select a CV file to upload.");
    }
  };
  const handleTextSubmit = async (text) => {
    if (text) {
      try {
        // Send a POST request to the backend with the text data
        const response = await fetch("http://localhost:3100/submit-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        // Check if the response is successful
        if (response.ok) {
          alert("Text submitted successfully!");
        } else {
          alert("Text submission failed.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please enter text to submit.");
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

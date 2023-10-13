import SubmitText from "./components/SubmitText";
import UploadFile from "./components/UploadFile ";

function App() {
  const handleTextSubmit = async (text) => {
    if (text) {
      try {
        // Send a POST request to the backend with the text data
        const response = await fetch("http://localhost:4000/submit-text", {
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
      <UploadFile />
      <SubmitText onTextSubmit={handleTextSubmit} />
    </div>
  );
}

export default App;

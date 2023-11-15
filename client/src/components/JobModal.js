import React from "react";
import "./JobModal.css";
function JobModal({ isOpen, onClose, fullJobDescription }) {
  const renderJobDescription = () => {
    if (!fullJobDescription) {
      return <p>No job description available.</p>;
    }
    // Convert the object to a JSON string with indentation for better readability
    const jsonString = JSON.stringify(fullJobDescription, null, 20);
    return <p>{jsonString}</p>;
  };
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Full Job Description</h2>
        {renderJobDescription()}
      </div>
    </div>
  );
}
export default JobModal;

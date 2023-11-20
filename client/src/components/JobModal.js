import React from "react";
import "./JobModal.css";
function JobModal({ isOpen, onClose, fullJobDescription }) {
  const renderJobDescription = () => {
    if (!fullJobDescription) {
      return <p>No job description available.</p>;
    }
    // Convert the object to a JSON string with indentation for better readability

    return <div>{fullJobDescription.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
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

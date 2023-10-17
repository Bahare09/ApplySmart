import React from "react";

function GenerateJobButton({ onClick }) {
  return (
    <button onClick={onClick} className="generate-button">
      Generate Job List
    </button>
  );
}

export default GenerateJobButton;

import React from "react";

function ChooseButton({ onClick }) {
  return (
    <button onClick={onClick} className="choose-button">
      Choose Job
    </button>
  );
}

export default ChooseButton;

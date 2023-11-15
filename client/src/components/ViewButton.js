import React from "react";
function ViewButton({ onClick }) {
  return (
    <button onClick={onClick} className="view-button">
      View Job
    </button>
  );
}
export default ViewButton;

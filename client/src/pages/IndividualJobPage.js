import React from "react";

function IndividualJobPage({ resultData }) {
  return (
    <div>
      <h1>individual job page</h1>
      <div>
        <h2>Tailored CV</h2>
        <p>{resultData.newCv}</p>
      </div>
      <div>
        <h2>cover Letter</h2>
        <p>{resultData.coverLetter}</p>
      </div>
    </div>
  );
}

export default IndividualJobPage;

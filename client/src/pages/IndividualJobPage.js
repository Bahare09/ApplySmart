import React from "react";
import { Link } from "react-router-dom";

function IndividualJobPage({ resultData }) {
  return (
    <div>
      <h1>individual job page</h1>
      <Link to="/joblisting">
        <button>Back</button>
      </Link>
      <div>
        <p>Job Description</p>
        <div>{resultData.description.split('\n\n').map(paragraph => <p>{paragraph}</p>)}</div>
      </div>



      <div>
        <h2>cover Letter</h2>
        <p>{resultData.coverLetter.split('\n\n').map(paragraph => <p>{paragraph}</p>)}</p>
      </div>
      <div>
        <h2>Tailored CV</h2>
        <p>{resultData.newCv.split('\n\n').map(paragraph => <p>{paragraph}</p>)}</p>
      </div>
      <div>
        <h2>JobFit</h2>
      </div>
      {resultData.url && <button><a href={resultData.url} target="blank" alt="job link">Apply</a> </button>}

    </div>
  );
}


export default IndividualJobPage;
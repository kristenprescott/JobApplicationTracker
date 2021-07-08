import "../Application/Application.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Application({ application, idx, deleteApplication }) {
  const history = useHistory();
  // const [issent, setIsSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  // const handleClickEdit = (e) => {
  //   setIsEdit(e.target.value);
  //   if (isEdit) {
  //     history.push({
  //       pathname: "/edit",
  //       state: { application, isEdit },
  //     });
  //   }
  //   console.log("Edit btn value: ", e.target.value);
  //   console.log("isEdit: ", isEdit);
  // };

  return (
    <div key={application._id} className="Application">
      <div id="application-container">
        {application.applicationSent ? (
          <div
            id="title-container"
            style={{
              color: "#faf7f1",
              backgroundColor: "#ff6347",
            }}
          >
            <div
              style={{
                color: "#faf7f1",
                border: "1px solid #faf7f1",
                backgroundColor: "#246eb9",
              }}
              className="idx-num"
            >
              {idx + 1}
            </div>
            <div className="title-wrapper">
              {/* COMPANY NAME */}
              <h4 htmlFor="companyName">Company:</h4>
              <p id="companyName" className="companyName" name="companyName">
                {application.companyName}
              </p>
            </div>
          </div>
        ) : (
          <div id="title-container">
            <div className="idx-num">{idx + 1}</div>
            <div className="title-wrapper">
              {/* COMPANY NAME */}
              <h4 htmlFor="companyName">Company:</h4>
              <p id="companyName" className="companyName" name="companyName">
                {application.companyName}
              </p>
            </div>
          </div>
        )}

        <div className="moreLessBtn-wrapper">
          <button
            className="moreLessBtn"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? "▲" : "▼"}
          </button>
        </div>
        {isOpen && (
          <div id="wrapper">
            {/* BUSINESS TYPE */}
            <div className="item-wrapper businessType">
              <h4 htmlFor="businessType">Business: </h4>
              <p id="businessType" name="businessType">
                {application.businessType}
              </p>
            </div>

            {/* COMPANY TYPE */}
            <div className="item-wrapper companyType">
              <h4 htmlFor="companyType">Type: </h4>
              <p id="companyType" name="companyType">
                {application.companyType}
              </p>
            </div>

            {/* JOB TITLE */}
            <div className="item-wrapper jobTitle">
              <h4 htmlFor="jobTitle">Job Title: </h4>
              <p id="jobTitle" name="jobTitle">
                {application.jobTitle}
              </p>
            </div>

            {/* WEBSITE */}
            <div className="item-wrapper website">
              <h4 htmlFor="website">Website: </h4>
              <p id="website" name="website">
                <a href={application.website}>Link</a>
              </p>
            </div>

            {/* APPLICATION URL */}
            <div className="item-wrapper applicationUrl">
              <h4 htmlFor="applicationUrl">Application URL: </h4>
              <p id="applicationUrl" name="applicationUrl">
                <a href={application.applicationUrl}>Link</a>
              </p>
            </div>

            {/* LOCATION */}
            <div className="item-wrapper jobLocation">
              <h4 htmlFor="jobLocation">Location: </h4>
              {application.remote ? (
                <span>{application.remote.toString()}</span>
              ) : (
                <span style={{ display: "none" }}></span>
              )}
              <p id="jobLocation" name="jobLocation">
                {application.jobLocation}
              </p>
            </div>

            {/* APPLICATION STATUS */}
            <div className="item-wrapper applicationStatus">
              <h4 htmlFor="applicationStatus">Application Status: </h4>
              <p id="applicationStatus" name="applicationStatus">
                {application.applicationStatus}
              </p>
            </div>

            {/* SENT? */}
            {/* <div className="item-wrapper applicationSent">
              <h4 htmlFor="applicationSent">Application Sent? </h4>
              <p id="applicationSent" name="applicationSent">
                {application.applicationSent.toString()}
              </p>
            </div> */}

            {/* RESPONSE? */}
            <div className="item-wrapper response">
              <h4 htmlFor="response">Response? </h4>
              <p id="response" name="response">
                {application.response.toString()}
              </p>
            </div>

            {/* DATE SUBMITTED */}
            <div className="item-wrapper dateSubmitted">
              <h4 htmlFor="dateSubmitted">Date Submitted: </h4>
              <p id="dateSubmitted" name="dateSubmitted">
                {application.dateSubmitted}
              </p>
            </div>

            {/* TECHNOLOGIES */}
            <div className="technologies-wrapper">
              <h4 htmlFor="technologies">Technologies: </h4>
              <div className="technologies" name="technologies">
                {application.technologies.map((technology, idx) => (
                  <ul key={idx}>
                    <li>
                      {" "}
                      <span>&#8226;</span> {technology}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
            {/* NOTES */}
            <div className="notes-wrapper">
              <h4 htmlFor="notes">Notes: </h4>
              <textarea id="notes" className="text-notes" name="notes" readOnly>
                {application.notes}
              </textarea>
            </div>
          </div>
        )}
        <div id="btns-wrapper">
          <button
            className="del-btn"
            onClick={(e) => {
              // Replace with custom confirm box <<-----------------------
              const confirmBox = window.confirm("Are your sure?");
              if (confirmBox === true) {
                deleteApplication(e, application._id);
              }
            }}
          >
            Delete?
          </button>
          <button
            className="btn edit-btn"
            onClick={() => {
              setIsEdit(true);
              if (isEdit) {
                history.push({
                  pathname: "/edit",
                  state: { application, isEdit: true },
                });
              }
              console.log("isEdit: ", isEdit);
            }}
            // onClick={handleClickEdit}
            // onClick={() => {
            //   setIsEdit(true);
            //   console.log("isEdit: ", isEdit);
            //   history.push({
            //     pathname: "/edit",
            //     state: { application, isEdit },
            //   });
            // }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

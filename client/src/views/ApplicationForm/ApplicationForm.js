import "./ApplicationForm.css";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const emptyForm = {
  __id: "",
  companyName: "",
  companyType: "",
  businessType: "",
  jobTitle: "",
  jobLocation: "",
  applicationStatus: "",
  remote: false,
  website: "",
  applicationUrl: "",
  dateSubmitted: "",
  applicationSent: false,
  response: false,
  notes: "",
  technologies: [],
};

export default function ApplicationForm({
  initialState = emptyForm,
  handleNetworkCall,
  isEdit,
}) {
  const history = useHistory();
  const [isRemote, setIsRemote] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [technology, setTechnology] = useState("");
  const [newApplication, setNewApplication] = useState(initialState);
  const sentCheckbox = useRef(null);
  // const responseCheckbox = useRef(null);
  const remoteCheckbox = useRef(null);
  const notes = useRef("");

  const handleClick = (e) => {
    // console.log("Technology ", e.target.value, " added.");
    setNewApplication({
      ...newApplication,
      technologies: [...newApplication.technologies, technology],
    });
    setTechnology("");
  };

  const handleChange = (e) => {
    setNewApplication({ ...newApplication, [e.target.name]: e.target.value });
    // console.log(`${e.target.name}: ${e.target.value}`);
  };

  const handleChangeTechnology = (e) => {
    setTechnology(e.target.value);
  };

  const handleSentCheckBox = () => {
    setIsSent(!isSent);
    const checkedValue = sentCheckbox.current.checked;
    setNewApplication({ ...newApplication, applicationSent: checkedValue });
    // console.log("sent? ", checkedValue);
  };

  // const handleResponseCheckBox = () => {
  //   const responseValue = responseCheckbox.current.checked;
  //   setNewApplication({ ...newApplication, response: responseValue });
  //   console.log("response? ", responseValue);
  // };

  const handleRemoteCheckBox = () => {
    setIsRemote(!isRemote);

    const remoteValue = remoteCheckbox.current.checked;
    setNewApplication({ ...newApplication, remote: remoteValue });
    console.log("remote? ", remoteValue);
  };

  const handleRemoveTechnology = (technology, idx) => {
    // console.log(technology, idx);
    // console.log(newApplication.technologies[idx]);
    const result = newApplication.technologies.filter(
      (tech) => tech !== technology
    );
    // console.log("result: ", result);
    setNewApplication({
      ...newApplication,
      technologies: result,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // edit/add depending
    handleNetworkCall(newApplication);
    // clear input after submission
    setNewApplication({
      companyName: "",
      companyType: "",
      businessType: "",
      jobTitle: "",
      jobLocation: "",
      applicationStatus: "",
      remote: false,
      website: "",
      applicationUrl: "",
      dateSubmitted: "",
      applicationSent: false,
      response: false,
      notes: "",
      technologies: [],
    });
    sentCheckbox.current.checked = false;
    // responseCheckbox.current.checked = false;
    remoteCheckbox.current.checked = false;
    // notes.current.value = newApplication.notes.value;
    console.log("App data: ", newApplication);
  };

  return (
    <div className="ApplicationsForm">
      {/* <h1>Job Application Tracker</h1> */}
      <div className="application-title">
        {/* <div className="back-btn-wrapper"> */}
        <button
          className="back-btn"
          onClick={() => {
            history.push("/");
          }}
        >
          ⇦ Back
          {/* <span>⇦ Back</span> */}
        </button>
        {/* </div> */}
        <h2>Application: </h2>
      </div>
      {/* {history.location.state.isEdit && history.location.state.isEdit ? (
        <h2>Edit application:</h2>
      ) : (
        <h2>Add new application:</h2>
      )} */}

      <form>
        <div className="container">
          {/* SIMPLE INPUTS */}
          <div className="input-container">
            {/* COMPANY NAME TEXT INPUT */}
            <div className="input-wrapper companyName">
              <label htmlFor="companyName">Company: </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={newApplication.companyName}
                onChange={handleChange}
              />
            </div>

            {/* BUSINESS TYPE TEXT INPUT */}
            <div className="input-wrapper businessType">
              <label htmlFor="businessType">Business: </label>
              <input
                type="text"
                name="businessType"
                value={newApplication.businessType}
                onChange={handleChange}
              />
            </div>

            {/* COMPANY TYPE SELECTOR */}
            <div className="input-wrapper companyType selector-wrapper">
              <label htmlFor="companyType">Type: </label>
              <select
                name="companyType"
                id="companyType"
                value={newApplication.companyType}
                onChange={handleChange}
              >
                <option value="">----- Select -----</option>
                <option value="Corporation">Corporation</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Startup">Startup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* JOB TITLE TEXT INPUT */}
            <div className="input-wrapper jobTitle">
              <label htmlFor="jobTitle">Job Title: </label>
              <input
                type="text"
                name="jobTitle"
                value={newApplication.jobTitle}
                onChange={handleChange}
              />
            </div>

            {/* WEBSITE TEXT INPUT */}
            <div className="input-wrapper website">
              <label htmlFor="website">Website: </label>
              <input
                type="text"
                name="website"
                value={newApplication.website}
                onChange={handleChange}
              />
            </div>

            {/* APPLICATION URL TEXT INPUT */}
            <div className="input-wrapper applicationUrl">
              <label htmlFor="applicationUrl">Application URL: </label>
              <input
                type="text"
                name="applicationUrl"
                value={newApplication.applicationUrl}
                onChange={handleChange}
              />
            </div>

            {/* REMOTE CHECKBOX */}
            <div className="input-wrapper remote bool-wrapper">
              <label htmlFor="remote">Remote?</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  ref={remoteCheckbox}
                  id="remote"
                  name="remote"
                  value={newApplication.remote}
                  onChange={handleRemoteCheckBox}
                />
              </div>
            </div>

            {!isRemote ? (
              <>
                {/* LOCATION TEXT INPUT */}
                <div className="input-wrapper jobLocation">
                  <label htmlFor="jobLocation">Location: </label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={newApplication.jobLocation}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <div style={{ display: "none" }}></div>
            )}

            {/* SENT CHECKBOX */}
            <div className="input-wrapper sent bool-wrapper">
              <label htmlFor="sent">Application sent?</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  ref={sentCheckbox}
                  id="sent"
                  name="sent"
                  value={newApplication.sent}
                  onChange={handleSentCheckBox}
                />
              </div>
            </div>
            {/* IF SENT, SELECT STATUS AND SENT DATE */}

            {isSent && isSent ? (
              <>
                {/* DATE SUBMITTED DATE INPUT */}
                <div className="input-wrapper dateSubmitted date-wrapper">
                  <label htmlFor="dateSubmitted">Date submitted: </label>
                  <input
                    type="date"
                    name="dateSubmitted"
                    value={newApplication.dateSubmitted}
                    onChange={handleChange}
                  />
                </div>

                {/* APPLICATION STATUS SELECTOR */}
                <div className="input-wrapper applicationStatus selector-wrapper">
                  <label htmlFor="applicationStatus">
                    Application Status:{" "}
                  </label>
                  <select
                    name="applicationStatus"
                    id="applicationStatus"
                    value={newApplication.applicationStatus}
                    onChange={handleChange}
                  >
                    <option value="">----- Select -----</option>
                    <option value="sent">Sent/Waiting for response</option>
                    <option value="phoneScreening">Phone Screening</option>
                    <option value="hiringTask">Hiring Task</option>
                    <option value="onsiteInterview">Onsite Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    {/* <option value="unsent">Unsent</option> */}
                  </select>
                </div>

                {/* RESPONSE CHECKBOX */}
                {/* <div className="input-wrapper response bool-wrapper">
                <label htmlFor="response">Application response?</label>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    ref={responseCheckbox}
                    id="response"
                    name="response"
                    value={newApplication.response}
                    onChange={handleResponseCheckBox}
                  />
                </div>
              </div> */}
              </>
            ) : (
              <div style={{ display: "none" }}></div>
            )}
          </div>

          {/* TECHNOLOGIES */}
          <div className="input-wrapper tech-container">
            <label htmlFor="technologies">Technologies: </label>
            <div className="technologies">
              <div>
                <input
                  type="text"
                  name="technologies"
                  value={technology}
                  onChange={handleChangeTechnology}
                />
                <button
                  className="add-tech-btn"
                  type="button"
                  onClick={handleClick}
                >
                  Add
                </button>
              </div>

              <div className="tech-list">
                <ul>
                  {newApplication.technologies.map((technology, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => {
                          handleRemoveTechnology(technology, idx);
                        }}
                      >
                        ✖
                      </button>
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* NOTES */}
          <div className="input-wrapper notes-container">
            <label htmlFor="notes">Notes: </label>
            <div className="notes">
              <textarea
                type="text"
                name="notes"
                placeholder="Anything else?"
                value={newApplication.notes}
                onChange={handleChange}
                ref={remoteCheckbox}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    console.log("• Enter key pressed!");

                    // • = &#2022;
                    // • = &#8226;
                    // ◦ = &#9702;
                    // ‣ = &#8227;
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="submit-btn-container">
          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

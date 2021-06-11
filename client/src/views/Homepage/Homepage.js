import "../Homepage/Homepage.css";
import ApplicationsList from "../ApplicationsList/ApplicationsList";

export default function Homepage() {
  return (
    <div className="Homepage">
      {/* <h1>Job Application Tracker</h1> */}
      <ApplicationsList />
    </div>
  );
}

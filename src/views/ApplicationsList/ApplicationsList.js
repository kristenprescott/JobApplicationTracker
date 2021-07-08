import "./ApplicationsList.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Application from "../Application/Application";

export default function ApplicationList() {
  const history = useHistory();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/applications");
        const data = await res.json();
        console.log("Initial data: ", data);
        setApplications(data);
      } catch (error) {
        console.log("Error: ");
        console.error(error);
      }
    })();
  }, []);

  const getApplications = async () => {
    try {
      const response = await fetch("http://localhost:8080/applications/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteApplication = async (e, id) => {
    try {
      const res = await fetch(`http://localhost:8080/applications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setApplications([...applications]);
      console.log("Deleted item: ", data);
    } catch (error) {
      console.error(error);
    } finally {
      await getApplications();
    }
  };

  return (
    <div className="ApplicationsList">
      <h2>Applications:</h2>
      <button
        className="btn add-new-btn"
        onClick={() => {
          history.push("/new");
        }}
      >
        Add New
      </button>
      <div>
        {applications.map((application, idx) => (
          <Application
            application={application}
            idx={idx}
            deleteApplication={deleteApplication}
          />
        ))}
      </div>
    </div>
  );
}

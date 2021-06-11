import ApplicationForm from "./ApplicationForm/ApplicationForm";
import { useHistory } from "react-router-dom";

const Add = () => {
  const history = useHistory();

  const handleAddSubmit = async (application) => {
    console.log("I am subitting this applicton to Add:");
    console.log(application);
    try {
      const res = await fetch("http://localhost:8080/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      });
      const data = await res.json();
      console.log("Added data", data);
      history.push("/applications");
    } catch (error) {
      console.log("Error: ");
      console.error(error);
    }
  };
  return (
    <div>
      <ApplicationForm handleNetworkCall={handleAddSubmit} />
    </div>
  );
};

export default Add;

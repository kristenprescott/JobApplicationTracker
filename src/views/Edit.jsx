import ApplicationForm from "./ApplicationForm/ApplicationForm";
import { useHistory /*, useLocation*/ } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  // const location = useLocation();

  const handleEditSubmit = async (application) => {
    console.log("I am subitting this applicton to EDIT:");
    console.log("Edit application: ", application);

    try {
      const res = await fetch(
        // `http://localhost:8080/applications/${application._id}`,
        `${process.env.REACT_APP_SERVER_URL}/applications/${application._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(application),
        }
      );
      const data = await res.json();
      console.log("Edited data", data);
      history.push("/applications");
    } catch (error) {
      console.log("Error: ");
      console.error(error);
    }
  };

  return (
    <div>
      <ApplicationForm
        initialState={history.location.state.application}
        isEditState={history.location.state.isEdit}
        handleNetworkCall={handleEditSubmit}
      />
      <button
        onClick={() => {
          console.log("isEdit location state: ", history.location.state.isEdit);
        }}
      >
        location
      </button>
    </div>
  );
};

export default Edit;

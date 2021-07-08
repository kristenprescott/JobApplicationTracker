import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./views/Homepage/Homepage";
// import ApplicationsList from "./views/ApplicationsList/ApplicationsList";
import Edit from "./views/Edit";
import Add from "./views/Add";

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li className="nav-link">
            <a href="/">Home</a>
          </li>
          <li className="nav-link">
            <a href="/applications">Applications</a>
          </li>
          <li className="nav-link add-new">
            <a href="/new">Add New</a>
          </li>
          <li className="nav-link edit">
            <a href="/edit">Edit</a>
          </li>
        </ul>
      </nav> */}
      <Switch>
        <Route path="/" exact component={Homepage} />

        {/* <Route path="/applications" component={ApplicationsList} /> */}

        <Route path="/new" component={Add} />

        <Route path="/edit" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;

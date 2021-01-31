import "./css/style.min.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthScreen } from "./screens/AuthScreen";
import { HomeScreen } from "./screens/HomeScreen";

function App() {
  return (
    <Fragment>
      <main>
        <div className="container">
          <Router>
            <Route path="/" component={HomeScreen} />
            <Route path="/auth" component={AuthScreen} />
          </Router>
        </div>
      </main>
    </Fragment>
  );
}

export default App;

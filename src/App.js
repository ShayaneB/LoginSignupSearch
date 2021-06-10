import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/login";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

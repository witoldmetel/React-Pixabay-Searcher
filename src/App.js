import React, { Component } from "react";
import { MuiThemeProvider } from "material-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import DBResults from "./components/DBResults";

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/dbresults" component={DBResults} />
            </Switch>
          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

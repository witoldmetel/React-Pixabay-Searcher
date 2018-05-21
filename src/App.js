import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Search from './components/Search';
import DBResults from './components/DBResults';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/dbresults" component={DBResults} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
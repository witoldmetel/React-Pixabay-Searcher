import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './components/NavBar';
import Search from './components/Search';
import DBResults from './components/DBResults';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Search />
          <DBResults />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
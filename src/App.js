import React, { Component } from 'react';

import './App.css';
import {Person} from './Components/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          Add-a-Person App
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Person />
            </div>
          </div>
        </div>
        <footer>
          Made by
          <a href="https://isaacs.design"> Isaac S.</a>
        </footer>
      </div>
    );
  }
}

export default App;

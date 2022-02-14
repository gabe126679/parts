import React, { Component } from "react";
import { Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar"; 

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
        </div>
      </Router>
    );
  }
}

export default App;
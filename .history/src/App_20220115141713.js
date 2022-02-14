import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/layout/dashboard" 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Motorcycles</h1>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
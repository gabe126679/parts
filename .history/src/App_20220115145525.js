import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProjectList from "./components/dashboard/ProjectList"; 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navbar />}>

            </Route>
          </Routes>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
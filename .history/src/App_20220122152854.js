import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CreateProject from "./components/projects/CreateProject"
import StripeContainer from "./components/stripe/StripeContainer"
import Cancel from "./components/stripe/Cancel"
import Success from "./components/stripe/Success"
import "@stripe/stripe-js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/projectPurchase/:id' component={StripeContainer} />
            <Route path='/cancel' component={Cancel} />
            <Route path='/success' component={Success} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
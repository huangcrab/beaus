import React, { Component } from "react";

import Landing from "./component/layout/Landing";
import Beers from "./component/beer-list/BeersContextWrap";
import BeerInfoContextWrap from "./component/beer-list/BeerInfoContextWrap";

import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "./context/MainContext";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App container">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/beaus-seasonal" component={Beers} />
            <Route
              exact
              path="/beaus-seasonal/:id"
              component={BeerInfoContextWrap}
            />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

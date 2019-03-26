import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Loadable from "react-loadable";
import { basePath } from "./app-config/config.js";

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => <div></div>
})

const Encyclopedia= Loadable({
  loader: () => import('./pages/Question_Encyclopedia/Encyclopedia'),
  loading: () => <div></div>
})

class App extends Component {
  componentDidMount () {
  }
  render() {
    return (
      <BrowserRouter basename={basePath}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/encyclopedia" component={Encyclopedia} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

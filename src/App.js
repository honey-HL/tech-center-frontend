import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Loadable from "react-loadable";
import { basePath } from "./app-config/config.js";



class App extends Component {
  componentDidMount () {
  }
  render() {
    return (
      <BrowserRouter basename={basePath}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/encyclopedia" onEnter={()=>{document.title="问问百科"}} component={Encyclopedia} />
          <Route exact path="/video" onEnter={()=>{document.title="教学视频"}} component={Video} />
        </Switch>
      </BrowserRouter>
    );
  }
}


const Video =  Loadable({
  loader: () => import('./pages/Instructional_Video/Video'),
  loading: () => <div></div>
})

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => <div></div>
})

const Encyclopedia= Loadable({
  loader: () => import('./pages/Question_Encyclopedia/Encyclopedia'),
  loading: () => <div></div>
})

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/styles/common.css';
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
          <Route exact path="/knowledge" onEnter={()=>{document.title="知识库"}} component={Knowledge} />
          <Route exact path="/sharing" onEnter={()=>{document.title="大师分享"}} component={Sharing} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const Sharing =  Loadable({
  loader: () => import('./pages/Master_Sharing/Sharing'),
  loading: () => <div></div>
})

const Knowledge =  Loadable({
  loader: () => import('./pages/Knowledge_Base/Knowledge'),
  loading: () => <div></div>
})

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

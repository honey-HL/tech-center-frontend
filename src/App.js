import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/styles/common.css';
// import { browserHistory } from 'react-router';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Loadable from "react-loadable";
import { basePath } from "./app-config/config.js";
import 'antd-mobile/dist/antd-mobile.css'; 



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
          <Route exact path="/result" onEnter={()=>{document.title="搜索问题"}} component={Result} />
          <Route exact path="/detail" onEnter={()=>{document.title="文章详情"}} component={ArticleDetail} />
        </Switch>
      </BrowserRouter>
    );
  }
}


const ArticleDetail =  Loadable({
  loader: () => import('./pages/article_detail1/Detail'),
  loading: () => <div></div>
})

const Result =  Loadable({
  loader: () => import('./pages/search_result1/Result'),
  loading: () => <div></div>
})

const Sharing =  Loadable({
  loader: () => import('./pages/master_sharing/Sharing'),
  loading: () => <div></div>
})

const Knowledge =  Loadable({
  loader: () => import('./pages/knowledge_base1/Knowledge'),
  loading: () => <div></div>
})

const Video =  Loadable({
  loader: () => import('./pages/instructional_video1/Video'),
  loading: () => <div></div>
})

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => <div></div>
})

const Encyclopedia= Loadable({
  loader: () => import('./pages/question_encyclopedia1/Encyclopedia'),
  loading: () => <div></div>
})

export default App;

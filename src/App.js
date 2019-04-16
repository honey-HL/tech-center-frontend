import React, { Component } from 'react';
import './App.css';
import './assets/styles/common.css';
// import { browserHistory } from 'react-router';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Loadable from "react-loadable";
import { basePath } from "./app-config/config.js";
import 'antd-mobile/dist/antd-mobile.css'

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
          <Route exact path="/adetail" onEnter={()=>{document.title="文章详情"}} component={ArticleDetail} />
          <Route exact path="/vdetail" onEnter={()=>{document.title="视频详情"}} component={VideoDetail} />
          <Route exact path="/sinquiry" onEnter={()=>{document.title="咨询专家"}} component={SubmitInquiry} />
          <Route exact path="/minquiry" onEnter={()=>{document.title="我的咨询"}} component={MyInquiry} />
        </Switch>
      </BrowserRouter>
    );
  }
}


const MyInquiry =  Loadable({
  loader: () => import('./pages/my_inquiry/MyInquiry'),
  loading: () => <div></div>
})

const SubmitInquiry =  Loadable({
  loader: () => import('./pages/submit_inquiry/SubmitInquiry'),
  loading: () => <div></div>
})

const VideoDetail =  Loadable({
  loader: () => import('./pages/video_detail/VideoDetail'),
  loading: () => <div></div>
})

const ArticleDetail =  Loadable({
  loader: () => import('./pages/article_detail/ArticleDetail'),
  loading: () => <div></div>
})

const Result =  Loadable({
  loader: () => import('./pages/search_result/Result'),
  loading: () => <div></div>
})

const Sharing =  Loadable({
  loader: () => import('./pages/master_sharing/Sharing'),
  loading: () => <div></div>
})

const Knowledge =  Loadable({
  loader: () => import('./pages/knowledge_base/Knowledge'),
  loading: () => <div></div>
})

const Video =  Loadable({
  loader: () => import('./pages/instructional_video/Video'),
  loading: () => <div></div>
})

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => <div></div>
})

const Encyclopedia= Loadable({
  loader: () => import('./pages/question_encyclopedia/Encyclopedia'),
  loading: () => <div></div>
})

export default App;

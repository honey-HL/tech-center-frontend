import React, { Component } from 'react';
import './NoaMatch.css';
import { Link } from 'react-router-dom';



export default class NoaMatch extends Component{
    render(){
      return(
        <div className="No_Article">
            <div className='box_404'>
                <div className='img_404'>
                    <img className="img" src={require('../../assets/images/404.png')}  alt="404"/>
                </div>
            </div>
            <div className="no_article">抱歉! 您访问的页面<span style={{color:'#f48870',}}>失联</span>啦...</div>
            <Link className='back_box' to={{pathname: '/'}}>
                <div className='back_home'>回到首页</div>
            </Link>
        </div>
      )
    }
  }
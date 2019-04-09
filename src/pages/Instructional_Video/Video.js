import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input } from 'antd';
import './Video.css';
import { http } from "../../common/http";
import { triangle } from '../../assets/images/encyclopedia/triangle.png';
import { video } from '../../assets/images/home/ask.png';
import Search from '../../components/search/search'
import Banner from '../../components/banner/banner'
import CardVertical from '../../components/card_vertical/card_vertical';
import BaikeHeader from '../../components/baike_header/baike_header';
import menu_icon from '../../assets/images/video/menu_icon.png'


class VideoStream extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                },
                {
                    title: '3123213iPhone 6系列更换 34672387435674836582342083721030屏幕总成 教程verfreergreg',
                    view: 72,
                    src: require('../../assets/images/video/cover.png')
                }
            ]
        }
    }
    componentDidMount() {}
    render() {
        return(
            <div className="VideoStream">
                <div className="VideoStream_inner">
                {
                    this.state.data.map((item, index) => {
                        return(
                            <CardVertical key={index} data={item}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bannerArr: [
                // {
                //     path: require('../../assets/images/1.jpg')
                // },
                // {
                //     path: require('../../assets/images/2.jpg')
                // }
            ]
        }
    }
    getBanner = async () => {
        let res = await http('/video/videocenter/api/getRecommend',{}, true);
        this.setState({bannerArr: res.data});
        console.log(res.data)
    }
    getValue (event){
        this.setState({search_value: event.target.value});
        console.log(this.state.search_value);
    }
    componentDidMount() {
        window.$mobile.navigationShow(false);
        this.getBanner()
    }
    render() {
        return(
            <div className="Video">
                <div className='Baike_Header'>
                    <div className='title_ea'>{this.props.title}</div>
                    <div className="back_search">
                        <Link to="/" className="home-server-item link">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                        <div className="search_col_video">
                            <Search history={this.props.history} back="/video" getValue={this.getValue.bind(this)} />
                        </div>
                        <div className="menu">
                            <img className="img" src={require('../../assets/images/video/menu_icon.png')}  alt="返回"/>
                        </div>
                    </div>
                </div>
                <div className="Video_container">
                    <Banner data={this.state.bannerArr}/>
                    <VideoStream/>
                </div>
            </div>
        )
    }
}

export default Video;
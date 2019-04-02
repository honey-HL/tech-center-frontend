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
                {
                    path: require('../../assets/images/1.jpg')
                },
                {
                    path: require('../../assets/images/2.jpg')
                }
            ]
        }
    }
    componentDidMount() {}
    render() {
        return(
            <div className="Video">
                <BaikeHeader history={this.props.history}/>
                <div className="Video_container">
                    <Banner data={this.state.bannerArr}/>
                    <VideoStream/>
                </div>
            </div>
        )
    }
}

export default Video;
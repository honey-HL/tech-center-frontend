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




class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_value: ''
        }
    }
    getValue (event){
        this.setState({search_value: event.target.value});
        console.log(this.state.search_value);
    }
    render() {
        return(
            <div className="">
                <div className='title_ea'>教学视频</div>
                <Row className="back_search" type="flex" justify="space-around" align="middle">
                    <Col span={1}>
                        <Link to="/" className="home-server-item link">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                    </Col>
                    <Col className="search_col" span={19}>
                        <Search getValue={this.getValue.bind(this)} />
                        {/* <Input className='search_question' placeholder="搜索问题" /> */}
                    </Col>
                    <Col className="menu_box" span={2}>
                         <div className='menu_icon'>
                            <img className="img" src={require('../../assets/images/video/menu_icon.png')}  alt="返回"/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

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
                <Header/>
                <Banner data={this.state.bannerArr}/>
                <VideoStream/>
            </div>
        )
    }
}

export default Video;
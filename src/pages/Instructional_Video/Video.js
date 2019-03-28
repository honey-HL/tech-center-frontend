import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input } from 'antd';
import './Video.css';
import { http } from "../../common/http";
import { triangle } from '../../assets/images/encyclopedia/triangle.png';
import { video } from '../../assets/images/home/ask.png';
import Search from '../../components/search/search'
import Banner from '../../components/banner/banner'




class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                                <img className="img" src={require('../../assets/images/encyclopedia/back.png')}  alt="返回"/>
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
            </div>
        )
    }
}

export default Video;
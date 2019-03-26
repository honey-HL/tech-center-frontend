import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import '../assets/styles/Home.css';
import { http } from "../common/http.js";
import banner1 from '../assets/images/1.jpg';
import ask from '../assets/images/home/ask.png';
import search_icon from '../assets/images/home/search.png';



class TabsCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hideAdd: false,
            gutter: 0,
            style_obj: {
                color:'#666'
            },
            types: [
                {name: '推荐'},
                {name: '最新'},
                {name: '最热'},
                {name: '专题'},
                {name: '技巧'}
            ]
        }
    }
    changeTab = () => {}
    componentDidMount () {}
    render(){
        const TabPane = Tabs.TabPane;
        return(
            <div className="TabsCard">
                <Tabs tabBarStyle={this.state.style_obj} defaultActiveKey="0" onChange={this.changeTab()}>
                    {
                        this.state.types.map((item, index) => {
                            return(
                                <TabPane tab={item.name} size='small' key={index}>{item.name}</TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        )
    }
}

class FourTypes extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            icons: [
                {
                    src: require('../assets/images/question_icon.png'),
                    title: '问问百科',
                    path: 'question_encyclopedia'
                },{
                    src: require('../assets/images/video_icon.png'),
                    title: '教学视频',
                    path: ''
                }, {
                    src: require('../assets/images/knowleage_icon.png'),
                    title: '知识库',
                    path: ''
                },{
                    src: require('../assets/images/share_icon.png'),
                    title: '大师分享',
                    path: ''
                }
            ]
        }
    }
    componentDidMount () {}
    render () {
        return (
            <div className='four_types'>
                <div className="bar"></div>
                <div className="types_container">
                    <Row className="types_row" type="flex" justify="center">
                        {
                            this.state.icons.map((item, index) => {
                                return (
                                    <Col key={index} span={6}>
                                        <Link to={item.path} className="home-server-item link">
                                            <div className="types_items">
                                                <div className="types_img">
                                                    <img className="banner_img" src={item.src} alt="banner" />
                                                </div>
                                                <div className='types_title'>{item.title}</div>
                                            </div>
                                        </Link>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <div className="bar"></div>
            </div>
        )
    }
}

class BannerAds extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            bannerArr: [ {
                path: require('../assets/images/1.jpg')
            },
            {
                path: require('../assets/images/2.jpg')
            }]
        }
    }
    getBannerList () {
        this.setState({
            bannrArr:[
                {
                    path: require('../assets/images/1.jpg')
                },
                {
                    path: require('../assets/images/2.jpg')
                }
            ] 
        })
        console.log(this.state.bannrArr);
        // this.setState({bannerArr: arr});
        // let res = await http('/User/GetImgValidCode', params, (cancel) => {
        //     this.cancelValidate = cancel;
        // })
    }
    componentDidMount () {
      // this.getBannerList()
    }
    render () {
        return(
            <div className="banner">
                <Carousel>
                {this.state.bannerArr.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>
                            <img className="banner_img" src={item.path} alt="banner" />
                        </div>
                      </div>
                    )
                  })}
                </Carousel>
            </div>
        )
    }
}


class Home extends Component {
    render() {
        return(
            <div className="home_header">
                <div className="header_box">
                    <div className='title'>技术中心</div>
                    <Row className="search_box" type="flex" justify="space-around" align="middle">
                        <Col className="search_left" span={16}>
                            <Input className='search_question' placeholder="搜索问题" />
                            <div className="search_icon">
                                <img className="consulting" src={search_icon} alt="搜索" />
                            </div>
                        </Col>
                        <Col className='expert_btn' span={7}>
                            {/* <Row gutter={0} justify="center">
                                <Col className="search_expert_icon" xs={{ span: 5, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                    <img className="consulting" src={ask} alt="咨询专家" />
                                </Col>
                                <Col className="consulting_title" xs={{ span: 16, offset: 1 }} lg={{ span: 6, offset: 2 }}> 咨询专家</Col>
                            </Row> */}
                            <div className="search_expert_icon">
                                <img className="consulting" src={ask} alt="咨询专家" />
                            </div>
                            <div className="consulting_title">
                                咨询专家
                            </div>
                        </Col>
                    </Row>
                </div>
                <BannerAds/>
                <FourTypes/>
                <TabsCard/>
                {/* <div className='buttom'>buttom</div> */}
            </div>
        );
    }
}

export default Home;
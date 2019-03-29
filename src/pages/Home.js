import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import '../assets/styles/Home.css';
import { http } from "../common/http.js";
import ask from '../assets/images/home/ask.png';
import search_icon from '../assets/images/home/search.png';
import eye from '../assets/images/home/eye.png';
import heart from '../assets/images/home/heart.png';
import Banner from '../components/banner/banner';
import CardHorizontal from '../components/card_horizontal/card_horizontal'


class TabsCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hideAdd: false,
            gutter: 0,
            style_obj: {
                color:'#666'
            },
            data: [
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: 'iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: 'iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: 'iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: 'iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                }
            ],
            types: [
                {name: '推荐'},
                {name: '最新'},
                {name: '最热'},
                {name: '专题'},
                {name: '技巧'}
            ]
        }
    }
    changeTab = (e) => {}
    componentDidMount () {}
    render(){
        const TabPane = Tabs.TabPane;
        return(
            <div className="TabsCard">
                <Tabs tabBarStyle={this.state.style_obj} defaultActiveKey="0" onChange={this.changeTab()}>
                    {
                        this.state.types.map((item, index) => {
                            return(
                                <TabPane tab={item.name} size='small' key={index}>
                                    {
                                        this.state.data.map((info, index1) => {
                                            return(
                                                <CardHorizontal key={index1} info={info}/>
                                            )
                                        })
                                    }
                                </TabPane>
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
                    path: 'encyclopedia'
                },{
                    src: require('../assets/images/video_icon.png'),
                    title: '教学视频',
                    path: 'video'
                }, {
                    src: require('../assets/images/knowleage_icon.png'),
                    title: '知识库',
                    path: 'knowledge'
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

class Home extends Component {
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
        // console.log(this.state.bannrArr);
        // this.setState({bannerArr: arr});
        // let res = await http('/User/GetImgValidCode', params, (cancel) => {
        //     this.cancelValidate = cancel;
        // })
    }
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
                            <div className="search_expert_icon">
                                <img className="consulting" src={ask} alt="咨询专家" />
                            </div>
                            <div className="consulting_title">
                                咨询专家
                            </div>
                        </Col>
                    </Row>
                    <Banner data={this.state.bannerArr}/>
                </div>
                <FourTypes/>
                <TabsCard/>
            </div>
        );
    }
}

export default Home;
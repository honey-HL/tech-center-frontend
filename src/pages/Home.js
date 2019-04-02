import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import '../assets/styles/Home.css';
import { http } from "../common/http.js";
import ask from '../assets/images/home/ask.png';
import search_icon from '../assets/images/home/search.png';
import Banner from '../components/banner/banner';
import CardHorizontal from '../components/card_horizontal/card_horizontal'
import Search from '../components/search/search'


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
                {name: '推荐', active: true, id: 1},
                {name: '最新', active: false, id: 2},
                {name: '最热', active: false, id: 3},
                {name: '专题', active: false, id: 4},
                {name: '技巧', active: false, id: 5}
            ]
        }
    }
    changeActiveTab = (info) => {
        const items = this.state.types;
        items.forEach((item) => {
            item.active = false;
            if (info.id == item.id) {
                item.active = true;
            }
        })
        this.setState({types: items})
    }
    changeTab = () => {

    }
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
                {/* <div className="tab_bar">
                    <div className="tab_bar_box">
                    {
                        this.state.types.map((item, index) => {
                            return(
                                <div onClick={() => this.changeActiveTab(item)} className={`tab_item ${item.active?'active':''}`} key={index}>{item.name}</div>
                            )
                        })
                    }
                    </div>
                    <div className="tab_content">
                    {
                        this.state.data.map((info, index1) => {
                            return(
                                <CardHorizontal key={index1} info={info}/>
                            )
                        })
                    }
                    </div>
                </div> */}
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
                    path: 'sharing'
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
                    <div className="types_row">
                        {
                            this.state.icons.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Link history={this.props.history} to={item.path} className="home-server-item link">
                                            <div className="types_items">
                                                <div className="types_img">
                                                    <img className="banner_img" src={item.src} alt="banner" />
                                                </div>
                                                <div className='types_title'>{item.title}</div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                </div>
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
            search_value: '',
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
    getValue (event) {
        this.setState({search_value: event.target.value});
        // debugger
        console.log('from home', this.state.search_value);
    }
    render() {
        return(
            <div className="Home">
                <div className="header_box">
                    <div className='title'>技术中心</div>
                    <div className="search_box" type="flex" justify="space-around" align="middle">
                        <div className="search_left" span={16}>
                            <Search history={this.props.history} back="/" pass={this.getValue.bind(this)} />
                            </div>
                        <div className='expert_btn' span={7}>
                            <div className="search_expert_icon">
                                <img className="consulting" src={ask} alt="咨询专家" />
                            </div>
                            <div className="consulting_title">
                                咨询专家
                            </div>
                        </div>
                    </div>
                    <Banner data={this.state.bannerArr}/>
                </div>
                <FourTypes/>
                <TabsCard/>
            </div>
        );
    }
}

export default Home;
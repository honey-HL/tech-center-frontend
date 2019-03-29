import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input } from 'antd';
import './Encyclopedia.css';
import { http } from "../../common/http.js";
import { triangle } from '../../assets/images/encyclopedia/triangle.png';
import { video } from '../../assets/images/home/ask.png';
import Search from '../../components/search/search'

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article_title: '三星',
            article_content: '三星集团是韩国最大的跨国企业集团，同时也是上市企业全球500强，三星集团包括众多的国际下属企业，旗下子公司有：三星电子、三星物产、三星航空、三星人寿保险、雷诺三星汽车等，业务涉及电子、金融、机械、化学等众多领域。三星集团成立于1938年，由李秉喆创办。三星集团是家族企业，李氏家族世袭，旗下各个三星产业均为家族产业，并由家族中的其他成员管理，集团领导人已传至 李氏第三代，李健熙为现任集团会长。',
            list:[
                {
                    name: '手机品牌',
                    id: 1,
                    active: false,
                    data: ['三星', '华为', '小米']
                },
                {
                    name: '手机屏幕',
                    id:2,
                    active: false,
                    data: ['三星手机屏幕', '华为手机屏幕', '小米手机屏幕']
                }
            ]
        }
    }
    getEncyDetail = (item) => {
        // const params = {
        //     type:"get", 
        //     param: {
        //         ProductCode: this.qrCode, 
        //         ProDuctEASCode: this.easCode, 
        //         SellerCode: this.sellerCode,
        //   }};
        // let res = await http('/User/GetImgValidCode', params, (res) => {
        //     this.setState({article: ''})
        // })
    }
    showMenu = (info) => {
        console.log('start', this.state.list)
        const items = this.state.list;
        if (info.active) {
            items.forEach((item) => {
                if (info.id == item.id) {
                    item.active = false;
                }
            })
        } else {
            items.forEach((item) => {
                item.active = false;
                if (info.id == item.id) {
                    item.active = true;
                }
            })
        }
        this.setState({list: items})
        console.log('end',this.state.list)
    }
    componentDidMount () {}
    render () {
        return(
            <div className='Article'>
                <Row className="inherit" type="flex" justify="space-around" align="middle">
                    <Col className='left_menu' span={7}>
                    {
                    this.state.list.map((item, index) => {
                        return(
                            <div key={index} className='memu_item'>
                                <div onClick={() => this.showMenu(item)} className='menu_title'>
                                    <span className={`jiao ${item.active?'jiao_up':''}`}>
                                        <img className="img" src={require('../../assets/images/encyclopedia/triangle.png')}  alt="折叠角"/>
                                    </span>
                                    {item.name}
                                </div>
                                <div className={item.active?"active_menu":'height_0'}>{
                                item.data.map((it, ide) => {
                                    return(
                                        <div onClick={() => this.getEncyDetail(it)} key={ide} className="memu_item_kid">
                                            {it}
                                        </div>
                                    )
                                })
                                }</div>
                            </div>
                        )
                    })
                   }
                    </Col>
                    <Col className="right_article" span={17}>
                        <div className="">
                            <div className="article_title">{this.state.article_title}</div>
                            <div className="article_content">{this.state.article_content}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

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
    componentDidMount () {}
    render() {
        return(
            <div className='Header'>
                    <div className='title_ea'>问问百科</div>
                    <Row className="back_search" type="flex" justify="space-around" align="middle">
                        <Col span={2}>
                            <Link to="/" className="home-server-item link">
                                <div className='back'>
                                    <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                                </div>
                            </Link>
                        </Col>
                        <Col className="search_col" span={22}>
                            <Search getValue={this.getValue.bind(this)} />
                            {/* <Input className='search_question' placeholder="搜索问题" /> */}
                        </Col>
                    </Row>
                    <Article/>
            </div>
        )
    }
}

class Encyclopedia extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {}
    render() {
        return(
            <div className="Encyclopedia">
                <Header/>
            </div>
        )
    }
}
export default Encyclopedia;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input } from 'antd';
import './Encyclopedia.css';
import { http } from "../../common/http.js";
import { triangle } from '../../assets/images/encyclopedia/triangle.png';
import { video } from '../../assets/images/home/ask.png';
import Search from '../../components/search/search';
import BaikeHeader from '../../components/baike_header/baike_header';

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article_title: '三星',
            article_content: '三星集三星集团是韩国最大的跨国企业集团集团是韩国最大的跨国企业集团，同时也是上集团是韩国最大的跨国企业集团，同时也是上集团是韩国最大的跨国企业集团，同时也是上集团是韩国最大的跨国企业集团，同时也是上，同时也是上市企业三星集团是韩国最大的跨国企业集团，同时也是上市企业三星集团是韩国最大的跨国企业集团，同时也是上市企业三星集团是韩国是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集是韩国最大的跨国企业集团，同时也是上市企业三星集最大的跨国企业集团，同时也是上市企业三星集团是韩国最大的跨国企业集团，同时也是上市企业团是韩国最大的跨国企业集团，同时也是上市企业全球500强，三星集团包括众多的国际下属企业，旗下子公司有：三星电子、三星物产、三星航空、三星人寿保险、雷诺三星汽车等，业务涉及电子、金融、机械、化学等众多领域。三星集团成立于1938年，由李秉喆创办。三星集团是家族企业，李氏家族世袭，旗下各个三星产业均为家族产业，并由家族中的其他成员管理，集团领导人已传至 李氏第三代，李健熙为现任集团会长。',
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
    componentDidMount () {
        window.$mobile.navigationShow(false);
    }
    render () {
        return(
            <div className='Article'>
                <div className='article_left_menu'>
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
                </div>
                <div className="right_article">
                    <div className="article_title">{this.state.article_title}</div>
                    <div className="article_content">{this.state.article_content}</div>
                </div>
            </div>
        )
    }
}

class Encyclopedia extends React.Component {
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
            <div className="Encyclopedia">
                <BaikeHeader title='问问百科' history={this.props.history}/>
                <Article/>
            </div>
        )
    }
}
export default Encyclopedia;
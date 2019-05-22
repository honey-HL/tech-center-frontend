import React, { Component } from 'react';
import './Encyclopedia.css';
import { http } from "../../common/http.js";
import BaikeHeader from '../../components/baike_header/baike_header';
import { Toast } from 'antd-mobile';
import { filterLink, getSimpleText } from '../../common/tool'
import { imgPrefix } from '../../../src/app-config/config.js';
import {like_red, like_white,cover} from '../../common/images';

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recommended_img: '',
            img_error: false,
            show_article: false,
            active_jnId: '',
            is_like_active: '',
            jaLike: '',
            article_title: '',
            article_content: '',
            jbImage: '',
            jbLink: '',
            jaId: '', // 文章id
            jbId: '',
            list:[
                // {
                //     name: '手机品牌',
                //     id: 1,
                //     active: false,
                //     data: ['三星', '华为', '小米']
                // },
                // {
                //     name: '手机屏幕',
                //     id:2,
                //     active: false,
                //     data: ['三星手机屏幕', '华为手机屏幕', '小米手机屏幕']
                // }
            ],
        }
    }
    getEncyDetail = async (item) => {
        if (!item.isClicked) {
            let params = {
                classifyId: item.jnId,
                pageIndex: 1,
                title: '',
                pageSize: 1,
                orderBy: '',
                type: 1 // 1问问百科 2知识库 3大师分享 4首页文章
            }
            let res = await http('/jszx/search', params);
            this.getBanner()
            this.setState({
                show_article: true,
                active_jnId: item.jnId,
                jaId: res.data&&res.data.data&&res.data.data.length>0?res.data.data[0].jaId:'',
                jaLike: res.data&&res.data.data&&res.data.data.length>0?res.data.data[0].jaLike:'',
                article_content: res.data&&res.data.data&&res.data.data.length>0?res.data.data[0].jaContent:'',
                article_title: res.data&&res.data.data&&res.data.data.length>0?res.data.data[0].jaTitle:'',
            })
        }
        let data = this.state.list
        for (let i in data) {
            for (let j in data[i].secondary) {
                data[i].secondary[j].isClicked = false;
                if (data[i].secondary[j].jnId === item.jnId) {
                    data[i].secondary[j].isClicked = true;
                    this.setState({
                        is_like_active: data[i].secondary[j].isLike
                    })
                }
            }
        }
    }
    getBanner = async () => {
        let res = await http('/jszx/banner', {type: 2});
        console.log(res);
        this.setState({
            recommended_img: imgPrefix + res.data[0].jbImage,
            jbId: res.data[0].jbId,
            jbImage: res.data[0].jbImage,
            jbLink: res.data[0].jbLink
        })
    }
    showMenu = async (info) => {
        console.log('start', this.state.list)
        const items = this.state.list;
        if (info.active) {
            items.forEach((item) => {
                if (info.jnId === item.jnId) {
                    item.active = false;
                }
            })
        } else {
            items.forEach((item) => {
                item.active = false;
                if (info.jnId === item.jnId) {
                    item.active = true;
                }
            })
        }
        this.setState({
            list: items,
            show_article: false,
        })
       this.initialMenu()
        console.log('end',this.state.list)
    }
    initialMenu () {
        let data = this.state.list
        for (let i in data) {
            for (let j in data[i].secondary) {
                data[i].secondary[j].isClicked = false;
            }
        }
    }
    getSecondary = async (data) => {
        let new_arr = []
        for (let i in data) {
            let res = await http('/jszx/baikeNavi', {pid:data[i].jnId});
            console.log(res)
            let secondary_arr = []
            res.data.forEach(item=>{
                secondary_arr.push({
                    jnId: item.jnId,
                    jnName: item.jnName,
                    jnPid: item.jnPid,
                    isLike: false,
                    isClicked: false,
                })
            })
            new_arr.push({
                jnId: data[i].jnId,
                jnName: data[i].jnName,
                secondary: secondary_arr,
                active: false,
            })
        }
        this.setState({
            list: new_arr
        })
        console.log(this.state.list)
    }
    bannerView = async (bannerId) => {
        await http('/jszx/bannerview', {bannerId: bannerId});
    }
    getBaikeNav = async ()=> {
        let response = await http('/jszx/baikeNavi', {pid:0});
        if (response.data) {
            this.getSecondary(response.data)
        } else {
            Toast.info(response.message, 1);
        }
    } 
    likeHandle = async (jaId) => { // GET /jszx/likearticle
        if (!this.state.is_like_active) { // 没有点过like
            await http('/jszx/likearticle', {id: jaId});
            let data = this.state.list;
            for (let i in data) {
                for (let j in data[i].secondary) {
                    if (data[i].secondary[j].jnId === this.state.active_jnId) {
                        data[i].secondary[j].isLike = true
                    }
                }
            }
            this.setState({
                jaLike: parseInt(this.state.jaLike) + 1,
                is_like_active: true,
                list: data,
            })
        }
    }
    componentDidMount () {
        this.getBaikeNav()
        if (window&&window.$mobile) {
            window.$mobile.navigationShow(false);
        }
    }

    handleImageErrored = (e) => {
        this.setState({recommended_img: cover})
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
                                    {item.jnName}
                                </div>
                                <div className={item.active?"active_menu":'height_0'}>{
                                item.secondary.map((it, ide) => {
                                    return(
                                        <div 
                                        onClick={() => this.getEncyDetail(it)} 
                                        key={ide} 
                                        className={`memu_item_kid ${it.isClicked?'memu_item_kid_active':''}`}
                                        >
                                            {it.jnName}
                                        </div>
                                    )
                                })
                                }</div>
                            </div>
                        )
                    })
                   }
                </div>
                <div 
                className='right_article' 
                style={{display: !this.state.show_article?
                    'none' : 'block',}}>
                    <div className="article_title">{this.state.article_title}</div>
                    <div className="en_article_content" dangerouslySetInnerHTML={{ __html: getSimpleText(this.state.article_content)}}></div>
                    <a 
                    onClick={() => this.bannerView(this.state.jbId)} 
                    href={filterLink(this.state.jbLink)} 
                    className='recommendation_img'
                    >
                        <img 
                            onError={this.handleImageErrored} 
                            className="img recommended_img" 
                            src={this.state.recommended_img}  
                            alt="推荐位图片"
                        />
                    </a>
                    <div className='like_article'>
                            <div
                                onClick={() => this.likeHandle(this.state.jaId)} 
                                className='like_a_box'>
                                <div style={{display:'block',width:'32px',height:'28px',}}>
                                {
                                    !this.state.is_like_active?<img style={{transition:'all .1s'}} className="img" src={like_white}  alt="喜欢"/>:<img style={{transition:'all .2s'}} className="img" src={like_red}  alt="喜欢"/>
                                }
                                </div>
                                <div className='jaLike'>{this.state.jaLike}</div>
                            </div>
                    </div>
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
                <BaikeHeader type={1} title='问问百科' history={this.props.history}/>
                <Article/>
            </div>
        )
    }
}
export default Encyclopedia;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';
import { http } from "../common/http.js";
import Banner from '../components/banner/banner';
import Search from '../components/search/search'
import Consulting from '../components/consulting/consulting'
import { ListView, Toast } from 'antd-mobile';
import {eye, heart, loading_img} from '../common/images';
import { imgPrefix } from '../../src/app-config/config.js';



class TabsCard extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageIndex: 1,
            data: [],
            dataSource,
            isLoading: true,
            active_item: '',
            open: true,
            total: '',
            pageSize: 10,
            no_data: false,
            show_loading: false,
            hideAdd: false,
            gutter: 0,
            style_obj: {
                color:'#666'
            },
            types: [ // 0推荐 1发布时间 2热度
                {name: '推荐', active: true, id: 0},
                {name: '最新', active: false, id: 1},
                {name: '最热', active: false, id: 2}
                // {name: '专题', active: false, id: 4},
                // {name: '技巧', active: false, id: 5}
            ]
        }
    }
    changeActiveTab = (info) => {
        const items = this.state.types;
        items.forEach((item) => {
            item.active = false;
            if (info.id !== undefined) {
                if ((info.id+'') === (item.id +'')) {
                item.active = true;
                    return
            }
            } else {
                if ((info.jacId === item.jacId)) {
                    item.active = true;
                    return
                }
            }
        })
        this.setState({
            isLoading: true,
            pageIndex: 1,
            data: [],
            types: items,
            active_item: info
        })
        let self = this
        this.timer = setTimeout(() => {
            self.loadData(info)
        }, 100);
        console.log(this.state);
        console.log(this.state.pageIndex);
    }
    getTabsNav = async () => {
        let response = await http('/jszx/classify', {type: 1});
        let new_types = this.state.types;
        if (response.data) {
            response.data.forEach((item) => {
                new_types.push({name: item.jacName, jacId: item.jacId, active: false})
            })
            this.setState({
                pageIndex:1,
                types: new_types
            })
            console.log(this.state.types)
            this.loadData(this.state.types[0])
        } else {
            Toast.info(response.message, 1);
            this.setState({isLoading: false})
        }
    }

    loadData = async (item, pageIndex) => {
        console.log('item.id',item.id)
        console.log('item.jacId',item.jacId)
        let params = {
            pageIndex: !pageIndex?this.state.pageIndex:pageIndex,
            title: '',
            pageSize: this.state.pageSize,
            orderBy: item.id !== 'undefined' ? item.id:'',
            classifyId: item.jacId !== 'undefined' ? item.jacId: '',
            type: 4 // 1问问百科 2知识库 3大师分享 4首页文章
        }
        let response = await http('/jszx/search', params);
        console.log(response);
        if (response.data) {
            let new_data = this.state.data;
            response.data.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({ 
                total: response.data.total,
                pageIndex: this.state.pageIndex + 1,
                data: new_data,
                dataSource: this.state.dataSource.cloneWithRows(new_data),
            })
            if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
                this.setState({isLoading: false})
            }
        } else {
            Toast.info(response.message, 1);
            this.setState({isLoading: false})
        }
    }
    
    onEndReached = (event) => {
        console.log(this.state.data.length)
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            this.loadData(this.state.active_item)
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    
    componentDidMount () {
        if (window.$mobile) {
            window.$mobile.navigationShow(true);
        }
        this.getTabsNav()
    }
    onScrollHandle = () => {
        console.log(this.lv)
        // console.log(this.lv.scrollHeight-window.screen.availHeight)

    }
    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                to={{pathname: 'adetail/'+rowData.jaId,state:{back: '/', id: rowData.jaId, scrollTop:''}}} 
                key={rowID} 
                className='Card_Horizontal'>
                    <div className='Card_Horizontal_item'>
                        <div className="Card_Horizontal_left">
                            <div className='info_content' style={{"WebkitBoxOrient": "vertical"}}>{rowData.jaTitle}</div>
                            <div className="view_like">
                                <div className='in_block'>
                                    <div className='eye'><img className="banner_img" src={eye} alt="banner" /></div>
                                    <span className='in_block view_num'>{rowData.jaView}</span>
                                </div>
                                <div className='heart_box in_block'>
                                    <div className='eye'><img className="banner_img" src={heart} alt="banner" /></div>
                                    <span className='in_block'>{rowData.jaLike}</span>
                                </div>
                            </div>
                        </div>
                        <div className="Card_Horizontal_right_img">
                            <img className="wh_100" src={imgPrefix + rowData.jaImage} alt="banner" />
                        </div>
                    </div>
                </Link>
            );
        };
        return(
            <div className="TabsCard">
                <div className="tab_bar">
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
                     <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        useBodyScroll
                        renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center', display:'flex',justifyContent:'center'}}>
                        {
                            this.state.isLoading?<div className={`loading_img`}>
                                <img className="banner_img" src={loading_img} alt="loading" />
                            </div>:<div>已加载全部</div>
                        }
                        </div>
                        )}
                        renderRow={row}
                        pageSize={4}
                        onScroll={() => this.onScrollHandle()}
                        scrollEventThrottle={200}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
                    </div>
                </div>
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
                <div className="section_bar"></div>
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
                <div className="section_bar"></div>
            </div>
        )
    }
}

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            availHeight: '',
            search_value: '',
            bannerArr: []
        }
    }
    getBannerList = async () => {
        let res = await http('/jszx/banner', {type: 1});
        console.log('res ', res);
        if (res.data) {
            this.setState({bannerArr: res.data});
            console.log(this.state.bannrArr);
        } else {
            Toast.info(res.message, 1);
            this.setState({isLoading: false})
        }
    }
    getValue (event) {
        this.setState({search_value: event.target.value});
        console.log('from home', this.state.search_value);
    }
    onScrollHandle = () => {
        console.log('出发了')
        // eslint-disable-next-line
        const scrollTop = this.scrollRef.scrollTop;
        console.log(scrollTop)
        // eslint-disable-next-line
        const clientHeight = this.scrollRef.clientHeight;
        // eslint-disable-next-line
        const scrollHeight = this.scrollRef.scrollHeight;
        // const isBottom = scrollTop + clientHeight === scrollHeight;
        // if (scrollHeight-clientHeight-scrollTop <= 120) {
            // debugger
            // this.refs.tabsCard.loadMore()
        // }
      };
     
    componentDidMount () {
        this.setState({availHeight: window.screen.availHeight + 'px'})
        this.getBannerList()
        // let latoutNode = document.getElementsByClassName("Home")[0];
        // if (latoutNode) {
        //     // debugger
        //     latoutNode.addEventListener("scroll", e => {
        //         debugger
        //       latoutNode.scrollTop = e.target.scrollTop;
        //       console.log(latoutNode.scrollTop)
        //     });
        //     // latoutNode.scrollTop = defaultScrollTop;
           
        // }
    }
    componentWillUnmount () {
        console.log(document.documentElement.getBoundingClientRect.top);
        console.log(document.getElementsByClassName('Home')[0].scrollTop);
    }

    handleConsulting = () => {
        this.props.history.push({
            pathname: '/minquiry',
            state: {
                back: '/'
            }
        })
    }
    
    render() {
        return(
            <div 
            // style={{ maxHeight: this.state.availHeight, overflowY: 'scroll' }}
            // ref={c => {this.scrollRef = c;}}
            // onScrollCapture={() => this.onScrollHandle()}
            className="Home">
                <div className="header_box">
                    <div className='title'>
                        技术中心
                        <div onClick={() => this.handleConsulting()} className='my_consulting'>我的咨询</div>
                    </div>
                    <div className="search_box">
                        <div className="search_left">
                            <Search history={this.props.history} type={4} back="/" pass={this.getValue.bind(this)} />
                        </div>
                        <Consulting search_expert_icon={'20%'} consulting_title={'63%'} back={'/'} info={'咨询专家'} history={this.props.history}/>
                    </div>
                </div>
                <div className="home_container">
                    <Banner data={this.state.bannerArr}/>
                    <FourTypes/>
                    <TabsCard ref="tabsCard"/>
                </div>
            </div>
        );
    }
}

export default Home;
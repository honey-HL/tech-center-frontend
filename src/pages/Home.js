import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';
import { http } from "../common/http.js";
import Banner from '../components/banner/banner';
import Search from '../components/search/search'
import Consulting from '../components/consulting/consulting'
import { ListView, Toast } from 'antd-mobile';
import {eye, heart, loading_img, cover} from '../common/images';
import { imgPrefix } from '../../src/app-config/config.js';
import { connect } from 'react-redux';
import ComImage from '../components/image/image';



class TabsCard extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            img_error: false,
            orderBy: '',
            classifyId: '',
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
            active_index: '',
            show_rf: true,
            availWidth: '',
            transWidth: '',
            types: [ // 0推荐 1发布时间 2热度
                {name: '推荐', active: false, id: 0},
                {name: '最新', active: false, id: 1},
                {name: '最热', active: false, id: 2}
                // {name: '专题', active: false, id: 4},
                // {name: '技巧', active: false, id: 5}
            ]
        }
    }
    changeActiveTab = (info, index) => {
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

        // 触发父组建方法 并传参
        this.props.toggleDispatch(info);
        // 触发父组建方法 并传参

        this.setState({
            active_index: index,
            transWidth: index*-this.state.availWidth,
            orderBy: info.id,
            classifyId: info.jacId,
            isLoading: true,
            show_rf: false,
            pageIndex: 1,
            data: [],
            types: items,
            active_item: info
        }, () => {
            let self = this
            this.timer = setTimeout(() => {
                self.loadData(info)
            }, 100);
        })
    }
    getTabsNav = async () => {
        let last_active = this.props.tiger.data
        console.log(last_active[0]);
        let response = await http('/jszx/classify', {type: 1});
        let new_types = this.state.types;
        if (response.data) {
            response.data.forEach((item) => {
                new_types.push({name: item.jacName, jacId: item.jacId, active: false})
            })
            let arr = [];
            for (let i = 0; i < new_types.length;i++){
                let obj = {unique: i+1}
                for (let key in new_types[i]) {
                    obj[key] = new_types[i][key]
                }
                arr.push(obj)
            }
            new_types = arr
            console.log(new_types);
            if (last_active.length > 0) {
                let activeItem = new_types.filter (item => {
                    return last_active[0].unique === item.unique
                })
                console.log(activeItem);
                if (activeItem.length > 0) {
                    activeItem[0].active = true;
                    this.setState({
                        orderBy: activeItem[0].id,
                        active_item: activeItem[0],
                        classifyId: activeItem[0].jacId,
                        pageIndex:1,
                        types: new_types
                    })
                } else {
                    new_types[0].active = true;
                    this.setState({
                        orderBy: this.state.types[0].id,
                        active_item: new_types[0],
                        classifyId:this.state.types[0].jacId,
                        pageIndex:1,
                        types: new_types
                    })
                }
            } else {
                new_types[0].active = true;
                this.setState({
                    orderBy: this.state.types[0].id,
                    active_item: new_types[0],
                    classifyId:this.state.types[0].jacId,
                    pageIndex:1,
                    types: new_types
                })
            }
            console.log(this.state.active_item)
            // this.setState({loading: true})
            this.loadData(this.state.active_item)


            // this.setState({
            //     orderBy: this.state.types[0].id,
            //     classifyId: this.state.types[0].jacId,
            //     pageIndex:1,
            //     types: new_types
            // })
            // this.loadData(this.state.types[0])


        } else {
            Toast.info(response.message, 1);
            this.setState({isLoading: false})
        }
    }

    loadData = async (item, pageIndex) => {
        this.setState({open: false})
        let params = {
            pageIndex: !pageIndex?this.state.pageIndex:pageIndex,
            title: '',
            pageSize: this.state.pageSize,
            orderBy: item.id !== undefined ? item.id:this.state.orderBy,
            classifyId: item.jacId !== undefined? item.jacId: this.state.classifyId,
            type: 4 // 1问问百科 2知识库 3大师分享 4首页文章
        }
        let response = await http('/jszx/search', params);
        if (params.pageIndex === 1) {
            this.setState({show_rf: false})
        } else {
            this.setState({show_rf: true})
        }
        if (response.data) {
            let new_data = this.state.data;
            response.data.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({ 
                open: true,
                total: response.data.total,
                pageIndex: this.state.pageIndex + 1,
                data: new_data,
                dataSource: this.state.dataSource.cloneWithRows(new_data),
            })
            if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
                this.setState({isLoading: false,show_rf: true,})
            }
        } else {
            Toast.info(response.message, 1);
            this.setState({isLoading: false, show_rf: true,})
        }
    }
    
    onEndReached = (event) => {
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            if (this.state.open) {
                this.loadData(this.state.active_item)
            }
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false,show_rf: true,})
        } 
    }

    componentDidMount () {
        this.setState({
            show_rf: false,
            availWidth: window.screen.availWidth
        })
        if (window.$mobile) {
            window.$mobile.navigationShow(true);
        }
        this.getTabsNav()
    }
    onScrollHandle = () => {
        // console.log(this.lv)
        // console.log(this.lv.scrollHeight-window.screen.availHeight)

    }

    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                id={rowID}
                to={{pathname: 'adetail/'+rowData.jaId,state:{back: '/', unique: this.state.active_item.unique,id: rowData.jaId, scrollTop:''}}} 
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
                            <ComImage imageUrl={imgPrefix + rowData.jaImage} />
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
                                <div onClick={() => this.changeActiveTab(item, index)} className={`tab_item ${item.active?'active':''}`} key={index}>{item.name}</div>
                            )
                        })
                    }
                    </div>
                    <div 
                    style={{
                        height:'100%',
                        transform:'translateX('+ this.state.transWidth+ 'px)',
                        width: this.state.availWidth*this.state.types.length + 'px'}}
                    className="tab_content">
                        {
                            this.state.types.map((item, index) => {
                                return(
                                    <ListView
                                        key={index}
                                        ref={el => this.lv = el}
                                        dataSource={parseInt(this.state.active_index + 1) === parseInt(index+1)?this.state.dataSource:this.state.dataSource.cloneWithRows([])}
                                        useBodyScroll
                                        style={{
                                            height: parseInt(this.state.active_index + 1) === parseInt(index+1)?'100%':0,
                                            width: this.state.availWidth + 'px'
                                        }}
                                        renderFooter={() => (
                                        <div style={{
                                            padding: 30, textAlign: 'center',
                                            display:this.state.show_rf?'flex':'none',
                                            justifyContent:'center'}}>
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
                               )
                            })
                        }
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

   toggleDispatch =  (active_item) => {
        this.props.getActiveTab(active_item);
   }
    
    render() {
        return(
            <div 
            // style={{ maxHeight: this.state.availHeight, overflowY: 'scroll' }}
            ref={c => {this.homeRef = c;}}
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
                    <Banner history={this.props.history} from={'/'} data={this.state.bannerArr}/>
                    <FourTypes/>
                    <TabsCard toggleDispatch={this.toggleDispatch.bind(this)} tiger={this.props.tiger} history={this.props.history} ref="tabsCard"/>
                </div>
            </div>
        );
    }
}

 //需要渲染什么数据
function mapStateToProps(state) {
    return {
      tiger: state
    }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        getActiveTab: item => dispatch({type: 'getActiveTab', active_item: item}),
    }
}

export default Home = connect(mapStateToProps, mapDispatchToProps)(Home);
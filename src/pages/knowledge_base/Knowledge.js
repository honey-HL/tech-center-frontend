import React, { Component } from 'react';
import './Knowledge.css';
import ComHeader from '../../components/com_header/com_header';
// import CardHorizontal from '../../components/card_horizontal/card_horizontal'
import { http } from "../../common/http.js";
import { Link } from 'react-router-dom';
import { imgPrefix } from '../../../src/app-config/config.js';
import { ListView, Toast } from 'antd-mobile';
import {eye, heart, loading_img, cover} from '../../common/images';


class Knowledge extends Component {
    constructor(props) {
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        super(props)
        this.state = {
            img_error: false,
            open: true,
            orderBy:'',
            classifyId:'',
            pageIndex: 1,
            pageSize: 10,
            data: [],
            total: '',
            dataSource,
            isLoading: true,
            show_rf: true,
            availHeight: '',
            style_obj: {
                color:'#666'
            },
            back:'/knowledge',
            types: [],
            active_index: '',
            availWidth: '',
            transWidth: '',
            active_item: '',
            loading: false,
            title: '知识库'
        }
    }

    loadData = async (item, pageIndex) => {
        this.setState({open: false})
        let params = {
            pageIndex: pageIndex?pageIndex:this.state.pageIndex,
            title: '',
            pageSize: this.state.pageSize,
            orderBy: this.state.orderBy,
            classifyId: item.jacId !== undefined? item.jacId: this.state.classifyId,
            type: 2, // 1问问百科 2知识库 3大师分享 4首页文章
        }
        let response = await http('/jszx/search', params);
        if (params.pageIndex === 1) {
            this.setState({show_rf: false})
        } else {
            this.setState({show_rf: true})
        }
        if (response.data) {
            let new_data = pageIndex === 1?[]:this.state.data;
            response.data.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({ 
                total: response.data.total,
                pageIndex: pageIndex?pageIndex+1:this.state.pageIndex + 1,
                data: new_data,
                dataSource: this.state.dataSource.cloneWithRows(new_data),
                open: true,
            })
            if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
                this.setState({isLoading: false,show_rf: true})
            }
        } else {
            Toast.info(response.message, 1);
            this.setState({isLoading: false, show_rf: true})
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
            this.setState({isLoading: false,show_rf: true})
        } 
    }

    getTabsNav = async () => {
        let res = await http('/jszx/classify', {type: 3}); // 分类类型 1 首页展示 2热搜展示 3知识库展示
        let new_types = this.state.types;
        if (res.data) {
            res.data.forEach((item) => {
                new_types.push({name: item.jacName, jacId: item.jacId, active: false})
            })
            new_types[0].active = true;
            this.setState({
                orderBy:this.state.types[0].id || '',
                classifyId:this.state.types[0].jacId,
                pageIndex:1,
                active_item: new_types[0],
                types: new_types
            }, () => {
                this.setState({loading: true})
                this.loadData(this.state.types[0], 1)
            })
        } else {
            Toast.info(res.message, 1);
            this.setState({loading: false})
        }
    }

    changeActiveTab = (info, index) => {
        this.setState({
            active_index: index,
            transWidth: index*-this.state.availWidth,
        })
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
            orderBy:info.id || '',
            classifyId:info.jacId,
            show_rf: false,
            types: items,
            active_item: info
        })
        this.loadData(info, 1)
    }

    componentWillUnmount() {
    }

    changeTab = (e) => {}
   
    componentDidMount(){
        if (window&&window.$mobile) {
            window.$mobile.navigationShow(false);
        }
        this.setState({
            show_rf: false,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight
        })
        this.getTabsNav()
    }

    handleImageErrored = (e) => {
        this.setState({img_error: true})
    }

    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                to={{pathname: 'adetail/'+rowData.jaId,state:{back: '/knowledge', id: rowData.jaId, scrollTop:''}}} 
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
                            <img 
                                onError={this.handleImageErrored.bind(this)} 
                                className="wh_100" 
                                src={!this.state.img_error?imgPrefix + rowData.jaImage:cover} 
                                alt="banner"
                            />
                        </div>
                    </div>
                </Link>
            );
        };
        return(
        <div className='Knowledge'>
            <ComHeader history={this.props.history} from='/' title={this.state.title}/>
            <div className="Redius_Blank">

                <div 
                style={{height:this.state.availHeight - 68}}
                className="TabsCard">
                    <div 
                     style={{minHeight:this.state.availHeight - 68}}
                    className="tab_bar">
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
                            width: this.state.availWidth*this.state.types.length + 'px'
                        }}
                        className="tab_content">
                        {
                            this.state.types.map((it, index) => {
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
                                        // onScroll={() => this.onScrollHandle()}
                                        scrollEventThrottle={200}
                                        onEndReached={this.onEndReached}
                                        onEndReachedThreshold={10}
                                    />
                                    // <CardHorizontal 
                                    // key={index} loading={this.state.loading} back={this.state.back} active_item ={this.state.active_item} type={2} ref={el => this.horizontal = el}/>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}

export default Knowledge;
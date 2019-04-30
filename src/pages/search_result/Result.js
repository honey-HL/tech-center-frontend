import React, { Component } from 'react';
import './Result.css';
import ComHeader from '../../components/com_header/com_header';
import search_icon from '../../assets/images/home/search.png';
import hot_icon from '../../assets/images/hot.png';
import clean from '../../assets/images/clean.png';
import Consulting from '../../components/consulting/consulting';
import { http } from "../../common/http.js";
import { ListView, Toast, InputItem } from 'antd-mobile';
import { Link } from 'react-router-dom';
import {eye, loading_img} from '../../common/images';
import { transformTime, getSimpleText } from '../../common/tool'



class Hot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hot_list: [],
        }
    }
    handleHotList = async () => {
        let res = await http('/jszx/classify', {type: 2}); // 分类类型 1 首页展示 2热搜展示 3知识库展示
        if (res.data) {
            let new_types = [];
            res.data.forEach((item) => {
                new_types.push({jacName: item.jacName, jacId: item.jacId})
            })
            this.setState({
                hot_list: new_types
            })
        } else {
            Toast.info(res.message, 1);
        }
        console.log(this.state.hot_list)
    }
    componentDidMount(prevProps, prevState) {
        console.log(prevProps, prevState);
        this.handleHotList();
    }

    searchByHot = (item) => {
        console.log(this.result)
        this.props.popular(item);
    }

    render () {
        let data = this.state.hot_list;
        let result = [];
        for(var i=0; i<data.length; i+=3){
            result.push(data.slice(i,i+3));
        }
        return(
            <div className={`Hot ${this.props.display?'show_hot':'hide_hot'}`}>
                <div className="hot_top">
                    <div className='hot_img'>
                        <img className="img" src={hot_icon} alt="serach"/>
                    </div>
                    <div className='hot_title'>热门搜索</div>
                </div>
                <div className="hot_main">
                {
                    result.map((row, i) => {
                        return (
                            <div key={i} className={`hot_row ${i !== result.length-1?'bottom_line':''}`}>
                            {
                                row.map((item, it) => {
                                    return(
                                        <div onClick={() => this.searchByHot(item)} key={it} className="hot_row_item">{item.jacName}</div>
                                    )
                                })
                            }
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

class ResultList extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            jacName: '',
            jacId: '',
            pageIndex: 1,
            pageSize: 10,
            dataSource,
            title: '',
            type: '',
            data: [],
        }
    }

    videoSearch =  async(key, type, pageIndex) => {
        console.log(key, type, pageIndex)
        let params = {
            brandId: '',
            typeId: '',
            modelId: '',
            pageIndex: pageIndex?pageIndex:this.state.pageIndex,
            pageSize: this.state.pageSize,
            title: key,
        }
        let response = await http('/video/videocenter/api/search', params, true);
        console.log(response);
        if (response.data) {
            let new_data = pageIndex?[]:this.state.data;
            response.data.data.forEach(element => {
                new_data.push(element);
            });
            this.setState({ 
                title: key,
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

    otherSearch = async(item, type, pageIndex) => {
        console.log(item, type, pageIndex)
        let params = {
            pageIndex: pageIndex?pageIndex:this.state.pageIndex,
            title: item.title?item.title: '',
            pageSize: this.state.pageSize,
            orderBy: '',
            classifyId: item.jacId?item.jacId: this.state.jacId?this.state.jacId:'',
            type: 4, // 1问问百科 2知识库 3大师分享 4首页文章 type固定为首页搜索
        }
        let response = await http('/jszx/search', params);
        console.log(response);
        if (response.data) {
            let new_data = pageIndex?[]:this.state.data;
            response.data.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({ 
                jacName: item.jacName,
                title: item.title?item.title: '',
                jacId: item.jacId?item.jacId: '',
                type: type,
                total: response.data.total,
                pageIndex: pageIndex?2:this.state.pageIndex + 1,
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
            if (this.props.origin === '/video') {
                this.videoSearch(this.state.title, this.state.type);
            } else {
                this.otherSearch({title: this.state.title}, this.state.type);
            }
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    componentDidMount () {
      
    }

    render () {
        let row = ''
        if (this.props.origin === '/video') {
            row = (rowData, sectionID, rowID) => {
                const imgPrefix = 'https://jszx.3ceasy.com/video/videocenter/'
                return (
                    <Link 
                        to={{pathname: '/vdetail/' + rowData.viId,state:{id: rowData.viId, back: '/result',scrollTop:''}}} 
                        key={rowID} 
                        className='Card_Vertical'
                    >
                        <div className="Card_Vertical_cover">
                            <img className="banner_img" src={imgPrefix + rowData.viCover} alt="banner" />
                        </div>
                        <div className="Card_Vertical_title" style={{'WebkitBoxOrient':'vertical'}}>{rowData.viTitle}</div>
                        <div className="Card_Vertical_view_box">
                            <div className='eye'>
                                <img className="img_float" src={eye} alt="浏览量" />
                            </div>
                            <span className='Card_Vertical_view_num'>{rowData.viView}</span>
                        </div>
                    </Link>
                );
            };
        } else {
            row = (rowData, sectionID, rowID) => {
                return (
                    <Link 
                    to={{pathname: '/adetail/' + rowData.jaId,state:{id: rowData.jaId, back: '/result',origin: this.props.origin,scrollTop:''}}} 
                    key={rowID} 
                    className='Card_Horizontal'>
                        <div className='Card_Horizontal_item'>
                            <div className="result_item">
                                <div className='r_jaTitle'>{rowData.jaTitle}</div>
                                <div className="r_jaContent" style={{"WebkitBoxOrient": "vertical"}} dangerouslySetInnerHTML={{ __html: getSimpleText(rowData.jaContent)}}></div>
                                <div className='r_time_view'>
                                    <div className="r_publish_time">{transformTime(rowData.jaPublishtime)}</div>
                                    <div className="r_view_like">
                                        <div style={{display: 'flex'}}>
                                            <div className='eye'><img className="banner_img" src={eye} alt="banner" /></div>
                                            <span className='result_view'>{rowData.jaView}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            };
        }
        return(
            <div 
            history={this.props.history}
            className={`List ${this.props.display?'show_hot':'hide_hot'}`}>
                <div className={`list_main ${this.props.origin==='/video'?'VideoStream':''}`}>
                  <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        useBodyScroll
                        renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center', display:'flex',justifyContent:'center'}}>
                        {
                            this.state.isLoading?<div className={`loading_img`}>
                                <img className="banner_img" src={loading_img} alt="loading" />
                            </div>:this.state.data.length>0?<div>已加载全部</div>:<div>抱歉,没有找到与<span className='keyword'>{this.state.title || this.state.jacName}</span>相关的结果</div>
                        }
                        </div>
                        )}
                        renderRow={row}
                        pageSize={4}
                        scrollEventThrottle={200}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={67}
                    />
                </div>
                <div className="fix_bar">
                    <div className='bar_tip'>没有找到答案？您可以</div>
                    <div className='consulting_box'>
                        <Consulting back={'/result'} search_expert_icon={'28%'} consulting_title={'48%'} info={'提问'} history={this.props.history}/>
                    </div>
                </div>
            </div>
        )
    }
}

class Result extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.query);
        this.state = {
            show_rlist: false,
            show_hot: true,
            show_clean: false,
            key: '',
            data: [],
            title: '搜索问题'
        }
    }
    cleanKey = () => {
        if (this.props.location.state.from === '/video') {
            this.setState({show_hot: false})
        } else {
            this.setState({show_hot: true})
        }
        this.setState({key: '',show_clean: false, show_rlist: false})
    }
    // handleValChange =  (event) => {
    //     let val = event.target.value.replace(/\s+/g,""); // 有效
    //     this.setState({key: val})
    //     if (val !== '' && val !== undefined) {
    //         this.setState({show_clean: true})
    //     } else {
    //         this.setState({show_clean: false})
    //     }
    // }
    handleValChange =  (value) => {
        console.log()
        console.log(value)
        let val = value.replace(/\s+/g,""); // 为毛这个步骤在这里无效？
        this.setState({key: val});
        if (this.props.location.state.from !== '/video' && value === '') { // 值被清空时展示热搜 隐藏结果列表
            this.setState({show_hot: true, show_rlist: false})
        }
    }
    handleEnterKey = (e) => {
        if(e.nativeEvent.keyCode === 13){
            this.submitQuestion(this.state.key);
        }
    }

    componentWillMount(){

    }

    popular = (item) => {
        console.log(item)
        this.rlist.otherSearch(item, this.props.location.state.type, 1)
        this.setState({show_hot: false, show_rlist: true})
    }

    componentDidMount(){
        var elem = document.getElementsByClassName('result_search')[0];
        elem.focus();
        console.log(this.props.location.state.type);
        if (window&&window.$mobile) {
            window.$mobile.navigationShow(false);
        }
        console.log('this.props.location.pathname', this.props);
        if (this.props.location.state.from === '/video') {
            this.setState({show_hot: false})
        }
    }

    submitQuestion = async (key) => {
        this.setState({show_hot: false, show_rlist: true})
        if (this.props.location.state.from === '/video') { // 来自于视频页面的搜索
            this.rlist.videoSearch(key, this.props.location.state.type, 1)
        } else {
            this.rlist.otherSearch({title: key}, this.props.location.state.type, 1)
        }
    }

    handleBack = (e) => {
        if (this.props.location.state.from === '/video') { // 来自视频的搜索
            this.setState({show_hot: false,show_rlist: false})
            if (!this.state.show_hot && !this.state.show_rlist) {
                this.props.history.goBack()
            }
        } else {
            if (!this.state.show_hot) {
                this.setState({show_hot: true, show_rlist: false})
            } else {
                this.props.history.goBack()
                // this.props.history.push({
                //     pathname: this.props.location.state.from,
                //     state: {
                //     }
                // });
            }
        }
    }

    render () {
        return(
        <div 
        history={this.props.history}
        ref={el => this.result = el}
        className='Search_Result'>

            {/* <div className='Com_Header'>
                <div className="Com_Header_row">
                    <div onClick={() => this.handleBack()} className='back_area'>
                        <div className='back'>
                            <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                        </div>
                    </div>
                    <div className="title_box">
                       搜索问题
                    </div>
                </div>
                <div className="white"></div>
            </div> */}

            <ComHeader history={this.props.history} from={this.props.location.state.from} title={this.state.title}/>
            <div className="Redius_Blank">

                    <div className="Result">
                        <div className='Result_Search'>
                        <InputItem
                                contentEditable="true"
                                ref="search"
                                autoFocus="autofocus"
                                type='text'
                                defaultValue={this.state.key}
                                placeholder="搜索问题"
                                clear
                                onChange={(event) => this.handleValChange(event)}
                                onKeyPress={(e) => this.handleEnterKey(e)}
                                maxLength="40"
                                className='result_search'
                            ></InputItem>
                            {/* <input
                                contentEditable="true"
                                ref="search"
                                value={this.state.key}
                                autoFocus="autofocus"
                                type='text'
                                maxLength="40"
                                onChange={(event) => this.handleValChange(event)}
                                onKeyPress={(e) => this.handleEnterKey(e)}
                                className='result_search'
                                placeholder="搜索问题" /> */}
                            <div onClick={() => this.submitQuestion(this.state.key)} className="result_magnifier">
                                <div className='clean_btn'>
                                    <img className="img" src={search_icon} alt="搜索" />
                                </div>
                            </div>
                            {/* <div onClick={() => this.cleanKey()} className={`clean ${this.state.show_clean?'show_clean':''}`}>
                                <div className='clean_btn'>
                                    <img className="img" src={clean} alt="清除" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <Hot popular={item => this.popular(item)} display={this.state.show_hot} />
                    <ResultList  history={this.props.history} ref={el => this.rlist = el} origin={this.props.location.state.from} display={this.state.show_rlist} />
                    {/* <div className={`fix_bar`} style={{opacity:!this.state.show_hot?1:0}}>
                        <div className='bar_tip'>没有找到答案？您可以</div>
                        <div className='consulting_box'>
                            <Cosulting/>
                        </div>
                    </div> */}

            </div>
        </div>
        )
    }
}

export default Result;
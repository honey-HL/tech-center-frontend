import React, { Component } from 'react';
import './Result.css';
import ComHeader from '../../components/com_header/com_header';
import search_icon from '../../assets/images/home/search.png';
import hot_icon from '../../assets/images/hot.png';
import clean from '../../assets/images/clean.png';
import Consulting from '../../components/consulting/consulting';
import { http } from "../../common/http.js";
import { ListView, Toast } from 'antd-mobile';
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

    changeKey = (item) => {
        console.log(this.result)
        this.props.popular(item.jacName);
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
                                        <div onClick={() => this.changeKey(item)} key={it} className="hot_row_item">{item.jacName}</div>
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
            pageIndex: 1,
            pageSize: 10,
            dataSource,
            title: '',
            type: '',
            data: [],
        }
    }

    getResults = async(key, type, pageIndex) => {
        console.log(key, type, pageIndex)
        let params = {
            pageIndex: pageIndex?pageIndex:this.state.pageIndex,
            title: key,
            pageSize: this.state.pageSize,
            orderBy: '',
            classifyId: '',
            type: type, // 1问问百科 2知识库 3大师分享 4首页文章
        }
        let response = await http('/jszx/search', params);
        console.log(response);
        if (response.data) {
            let new_data = pageIndex?[]:this.state.data;
            response.data.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({ 
                title: key,
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
            this.getResults(this.state.title, this.state.type);
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    componentDidMount () {
      
    }

    render () {
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                to={{pathname: 'adetail',state:{id: rowData.jaId, back: '/result',origin: this.props.origin,scrollTop:''}}} 
                key={rowID} 
                className='Card_Horizontal'>
                    <div className='Card_Horizontal_item'>
                        <div className="result_item">
                            <div className='r_jaTitle'>{rowData.jaTitle}</div>
                            <div className="r_jaContent" style={{"WebkitBoxOrient": "vertical"}} dangerouslySetInnerHTML={{ __html: getSimpleText(rowData.jaContent)}}></div>
                            <div className='r_time_view'>
                                <div className="r_publish_time">{transformTime(rowData.jaPublishtime)}</div>
                                <div className="r_view_like">
                                    <div className='in_block'>
                                        <div className='eye'><img className="banner_img" src={eye} alt="banner" /></div>
                                        <span className='in_block view_num'>{rowData.jaView}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        };
        return(
            <div 
            history={this.props.history}
            className={`List ${this.props.display?'show_hot':'hide_hot'}`}>
                <div className="list_main">
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
            show_hot: true,
            show_clean: false,
            key: '',
            data: [],
            title: '搜索问题'
        }
    }
    cleanKey = () => {
        this.setState({key: '',show_clean: false, show_hot: true})
    }
    handleVal =  (event) => {
        let val = event.target.value.replace(/\s+/g,"");
        this.setState({key: val})
        if (val !== '' && val !== undefined) {
            this.setState({show_clean: true})
        } else {
            this.setState({show_clean: false})
        }
    }
    handleEnterKey = (e) => {
        if(e.nativeEvent.keyCode === 13){
            this.submitQuestion(this.state.key);
        }
    }

    componentWillMount(){

    }

    popular = (jacName) => {
        console.log(jacName)
        this.rlist.getResults(jacName, this.props.location.state.type, 1)
        this.setState({show_hot: false})
    }

    componentDidMount(){
        var elem = document.getElementsByClassName('result_search')[0];
        elem.focus();
        console.log(this.props.location.state.type);
        window.$mobile.navigationShow(false);
        console.log('this.props.location.pathname', this.props);
    }

    submitQuestion = async (key) => {
        this.setState({show_hot: false})
        this.rlist.getResults(key, this.props.location.state.type, 1)
    }

    handleBack = (e) => {
        if (!this.state.show_hot) {
            this.setState({show_hot: true})
        } else {
            this.props.history.push({
                pathname: this.props.location.state.from,
                state: {
                }
            });
        }
    }

    render () {
        return(
        <div 
        history={this.props.history}
        ref={el => this.result = el}
        className='Search_Result'>

            <div className='Com_Header'>
                <div className="Com_Header_row">
                    <div onClick={() => this.handleBack()} className='back'>
                        <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                    </div>
                    <div className="title_box">
                       搜索问题
                    </div>
                </div>
                <div className="white"></div>
            </div>

            {/* <ComHeader history={this.props.history} from={this.props.location.state.from} title={this.state.title}/> */}
            <div className="Redius_Blank">

                    <div className="Result">
                        <div className='Result_Search'>
                            <input
                                ref="search"
                                value={this.state.key}
                                autoFocus="autofocus"
                                type='text'
                                maxLength="40"
                                onChange={(event) => this.handleVal(event)}
                                onKeyPress={(e) => this.handleEnterKey(e)}
                                className='result_search'
                                placeholder="搜索问题" />
                            <div onClick={() => this.submitQuestion(this.state.key)} className="result_magnifier">
                                <img className="img_search" src={search_icon} alt="搜索" />
                            </div>
                            <div onClick={() => this.cleanKey()} className={`clean ${this.state.show_clean?'show_clean':''}`}>
                                <img className="img_search" src={clean} alt="清除" />
                            </div>
                        </div>
                    </div>
                    <Hot popular={item => this.popular(item)} display={this.state.show_hot} />
                    <ResultList  history={this.props.history} ref={el => this.rlist = el} origin={this.props.location.state.from} display={!this.state.show_hot} />
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
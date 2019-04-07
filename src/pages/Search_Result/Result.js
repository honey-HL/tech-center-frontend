import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Result.css';
import { http } from "../../common/http";
import ComHeader from '../../components/com_header/com_header';
import search_icon from '../../assets/images/home/search.png';
import hot_icon from '../../assets/images/hot.png';
import clean from '../../assets/images/clean.png';
import eye from '../../assets/images/home/eye.png';
import ComEye from '../../components/com_eye/com_eye';
import Cosulting from '../../components/consulting/consulting';



class Hot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hot_list: ['屏幕总成', '代修服务', '屏幕门', 'xs信号问题', '小米8青春版', 'OPPO X1']
        }
    }
    handleHotList = () => {
        let data = this.state.hot_list;
        let result = [];
        for(var i=0; i<data.length; i+=3){
            result.push(data.slice(i,i+3));
        }
        this.setState({hot_list: result})
        console.log(result);
        console.log(this.state.hot_list);
    }
    componentDidMount(prevProps, prevState) {
        console.log(prevProps, prevState);
        // this.handleHotList();
    }
    changeKey = (item) => {

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
                        <img className="img_search" src={hot_icon}/>
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
                                        <div onClick={() => this.changeKey(item)} key={it} className="hot_row_item">{item}</div>
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
        this.state = {
            data: [
                {
                    title: 'XS屏幕更换的时候有哪些注意事项？',
                    content: '首先回答一下其他人说的在设置-声音里面关闭按键音的方法置-声音里面关闭按键音的方法置-声音里面关闭按键音的方法置-声音里面关闭按键音的方法是错误的，这样只能关闭输键音的方法是错误的，这样',
                    view: 3123,
                    date: '01月27日',
                    time: '21:09'
                },
                {
                    title: 'XS屏幕更换的时候有哪些注意事项？',
                    content: '首先回答一下其他人说的在设置-声音里面关闭按键音的方法是错误的，这样只能关闭输键音的方法是错误的，这样',
                    view: 3123,
                    date: '01月27日',
                    time: '21:09'
                },
                {
                    title: 'XS屏幕更换的时候有哪些注意事项？',
                    content: '首先回答一下其他人说的在设置-声音里面关闭按键音的方法是错误的，这样只能关闭输键音的方法是错误的，这样',
                    view: 3123,
                    date: '01月27日',
                    time: '21:09'
                },
                {
                    title: 'XS屏幕更换的时候有哪些注意事项？',
                    content: '首先回答一下其他人说的在设置-声音里面关闭按键音的方法是错误的，这样只能关闭输键音的方法是错误的，这样',
                    view: 3123,
                    date: '01月27日',
                    time: '21:09'
                },
                {
                    title: 'XS屏幕更换的时候有哪些注意事项？',
                    content: '首先回答一下其他人说的在设置-声音里面关闭按键音的方法是错误的，这样只能关闭输键音的方法是错误的，这样',
                    view: 3123,
                    date: '01月27日',
                    time: '21:09'
                },
                {
                    title: 'XS屏幕更换的时候有哪些注意事项？',
                    content: '首先回答一下其他人说的在设置-声音里面关闭按键音的方法是错误的，这样只能关闭输键音的方法是错误的，这样',
                    view: 3123,
                    date: '01月27日',
                    time: '21:09'
                }
            ]
        }
    }
    render () {
        return(
            <div className={`List ${this.props.display?'show_hot':'hide_hot'}`}>
                <div className="list_main">
                {
                    this.state.data.map((item, index) => {
                        return(
                            <div key={index} className="list_item">
                                <div className="list_title">{item.title}</div>
                                <div className="list_content" style={{'WebkitBoxOrient':'vertical'}}>{item.content}</div>
                                <div className="list_bottom">
                                    <div className="bottom_left"> 
                                        <div className="date">{item.date}</div>
                                        <div className='time'>{item.time}</div>
                                    </div>
                                    <div className='bottom_right'>
                                        <ComEye view={item.view}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className="fix_bar">
                    <div className='bar_tip'>没有找到答案？您可以</div>
                    <div className='consulting_box'>
                        <Cosulting/>
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
    getResults = (key) => {
        console.log('key ', key);
    }
    changeTab = (e) => {}
    componentWillMount(){

    }
    componentDidMount(){
        window.$mobile.navigationShow(false);
        console.log('this.props.location.pathname', this.props);
    }
    submitQuestion = (search_key) => {
        this.setState({show_hot: false})
    }
    render(){
        return(
            <div className='background_orange'>
                <ComHeader from={this.props.location.state.from} title={this.state.title}/>
                <div className="Redius_Blank">
                    <div className="Result">
                        <div className='Result_Search'>
                            <input
                                ref="search"
                                value={this.state.key}
                                type='text'
                                maxLength="40"
                                onChange={(event) => this.handleVal(event)}
                                onKeyPress={(e) => this.handleEnterKey(e)}
                                className='result_search'
                                placeholder="搜索问题" />
                            <div onClick={() => this.submitQuestion(this.state.search_key)} className="result_magnifier">
                                <img className="img_search" src={search_icon} alt="搜索" />
                            </div>
                            <div onClick={() => this.cleanKey()} className={`clean ${this.state.show_clean?'show_clean':''}`}>
                                <img className="img_search" src={clean} alt="清除" />
                            </div>
                        </div>
                    </div>
                   <Hot display={this.state.show_hot} />
                   <ResultList display={!this.state.show_hot}/>
                </div>
            </div>
        )
    }
}

export default Result;
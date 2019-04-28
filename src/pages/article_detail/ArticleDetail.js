import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ArticleDetail.css';
import { http } from "../../common/http";
import ComHeader from '../../components/com_header/com_header';
import { ListView, Toast } from 'antd-mobile';
import { imgPrefix } from '../../app-config/config';
import {eye, heart, loading_img, like_white, like_red } from '../../common/images';


class ArticleDetail extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            pageIndex: 1,
            pageSize: 10,
            isLoading: true,
            data: [],
            total: '',
            jaId: '',
            jacId: '',
            jaLike: '',
            content: '',
            jaSource: '',
            jaPublishtime: '',
            is_like_active: false,
            id: '',
            jaType: '',
            jaTitle: '',
            title: '文章详情',
        }
    }

    transformTime = (str) => {
        let arr = new Date(parseInt(str)).toString().split(' ');
        let year = arr[3];
        let day = arr[2];
        let time = arr[4];
        let month = '';
        switch (arr[1]) {
            case "Jan":
                month = '01月'; 
            break;
            case "Feb":
                month = '02月'; 
            break;
            case "Mar":
                month = '03月';
            break;
            case "Apr":
                month = '04月';
            break;
            case "May":
                month = '05月';
            break;
            case "Jun":
                month = '06月';
            break;
            case "Jul":
                month = '07月';
            break;
            case "Aug":
                month = '08月';
            break;
            case "Sep":
                month = '09月';
            break;
            case "Oct":
                month = '10月';
            break;
            case "Nov":
                month = '11月';
            break;
            case "Dec":
                month = '12月';
            break;
            default:
            break
        }
        return year + '年' + month + day + '日 ' + time; 
    }

    getArticle = async (id) => {
        let response = await http('/jszx/getarticle', {id:id});
        this.setState({
            data: [],
            pageIndex: 1,
            id: this.props.location.state.id, 
            content: response.data.jaContent,
            jaTitle: response.data.jaTitle,
            jaLike: response.data.jaLike,
            jaId: response.data.jaId,
            jacId: response.data.jacId,
            jaSource: response.data.jaSource,
            jaPublishtime: this.transformTime(response.data.jaPublishtime),
            jaType: response.data.jaType
        });
        console.log(response.data.jaPublishtime);
        console.log(new Date(parseInt(response.data.jaPublishtime)));
        this.loadData()
        this.node.scrollIntoView(); // 回到顶部
        console.log(response);
    }
    
    onEndReached = (event) => {
        console.log(this.state.data.length)
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            this.loadData()
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    loadData = async () => {
        let params = {
            pageIndex: this.state.pageIndex,
            title: '',
            pageSize: this.state.pageSize,
            orderBy: '',
            classifyId: this.state.jacId,
            type: this.state.jaType // 1问问百科 2知识库 3大师分享 4首页文章
        }
        let response = await http('/jszx/search', params);
        console.log(response);
        if (response.data) {
            let new_data = this.state.data;
            response.data.data.forEach(element => {
                if (parseInt(element.jaId) !== parseInt(this.state.jaId)) {
                    new_data.push(element);
                }
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

    likeHandle = async (jaId) => { // GET /jszx/likearticle
        if (!this.state.is_like_active) { // 没有点过like
            await http('/jszx/likearticle', {id: jaId});
            this.setState({
                jaLike: parseInt(this.state.jaLike) + 1,
                is_like_active: true,
            })
        }
    }

    componentWillUnmount(){
    }

    componentDidMount(){
        this.getArticle(this.props.location.state.id);
        console.log(this.props.location.state);
        console.log(this.props.back)
        window.$mobile.navigationShow(false);
    }

    handleBack = (e) => {
        this.props.history.goBack() // 会回到之前的滚动位置
    }

    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                onClick={() => this.getArticle(rowData.jaId)}
                to={{pathname: 'adetail',state:{id: rowData.jaId}}} 
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
                            <img className="banner_img" src={imgPrefix + rowData.jaImage} alt="banner" />
                        </div>
                    </div>
                </Link>
            );
        };
        return(
        <div 
        ref={node => this.node = node}
        className='Detail_Article'
        >
            {/* <ComHeader history={this.props.history} from={!this.props.location.state.back?'/':this.props.location.state.back} title={this.state.title}/> */}
            <div className='Com_Header'>
                <div className="Com_Header_row">
                    <div onClick={() => this.handleBack()} className='back_area'>
                        <div className='back'>
                            <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                        </div>
                    </div>
                    <div className="title_box">
                        {this.state.title}
                    </div>
                </div>
                <div className="white"></div>
            </div>
            <div className="Redius_Blank">
                <div className='jaTitle'>{this.state.jaTitle}</div>
                <div className='tip_box'>
                    <div className='jaPublishtime'>{this.state.jaPublishtime}</div>
                    <div>来源: {this.state.jaSource}</div>
                </div>
                <div className="article_content" dangerouslySetInnerHTML={{ __html: this.state.content}}></div>
                <div 
                    onClick={() => this.likeHandle(this.state.jaId)} 
                    className='like_article'
                    >
                        <div style={{display:'block',width:'32px',height:'28px',}}>
                        {
                            !this.state.is_like_active?<img style={{transition:'all .2s'}} className="img" src={like_white}  alt="喜欢"/>:<img style={{transition:'all .2s'}} className="img" src={like_red}  alt="喜欢"/>
                        }
                        </div>
                        <div className='jaLike'>{this.state.jaLike}</div>
                </div>
                <div className="section_bar"></div>
                <div className="relative_article">
                    <div className="relative_title">相关文章</div>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        className="am-list sticky-list"
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
                        onScroll={() => { console.log('scroll'); }}
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

export default ArticleDetail;
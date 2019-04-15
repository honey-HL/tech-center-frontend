import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ArticleDetail.css';
import { http } from "../../common/http";
import ComHeader from '../../components/com_header/com_header';
import { ListView, Toast } from 'antd-mobile';
import { imgPrefix } from '../../app-config/config';
import {eye, heart, loading_img} from '../../common/images';


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
            content: '',
            id: '',
            title: '文章详情',
        }
    }
    getArticle = async (id) => {
        let response = await http('/jszx/getarticle', {id:id});
        this.setState({
            data: [],
            pageIndex: 1,
            id: this.props.location.state.id, 
            content: response.data.jaContent,
            jacId: response.data.jacId,
            jaType: response.data.jaType
        });
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
    componentWillUnmount(){
    }
    componentDidMount(){
        this.getArticle(this.props.location.state.id);
        console.log(this.props.location.state);
        console.log(this.props.back)
        window.$mobile.navigationShow(false);
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
            <ComHeader from={!this.props.location.state.back?'/':this.props.location.state.back} title={this.state.title}/>
            <div className="Redius_Blank">
                <div className="article_content" dangerouslySetInnerHTML={{ __html: this.state.content}}></div>
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
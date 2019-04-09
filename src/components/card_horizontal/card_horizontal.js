import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './card_horizontal.css';
import eye from '../../assets/images/home/eye.png';
import heart from '../../assets/images/home/heart.png';
import { imgPrefix } from '../../../src/app-config/config.js';
import loading_img from '../../assets/images/loading.png';
import { ListView } from 'antd-mobile';
import {http} from '../../common/http'


class Card_Horizontal extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            data: [],
            total: '',
            dataSource,
            isLoading: true,
        }
    }
    loadData = async (item, pageIndex) => {
        let params = {
            title: '',
            pageSize: this.state.pageSize,
            pageIndex: !pageIndex?this.state.pageIndex:pageIndex,
            orderBy: item.id !== undefined ? item.id:'',
            classifyId: item.jacId !== undefined ? item.jacId: '',
            type: 4 // 1问问百科 2知识库 3大师分享 4首页文章
        }
        let response = await http('/jszx/search', params);
        console.log(response);
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
    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                to={{pathname: 'detail',state:{id: rowData.jaId}}} 
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
                    </div>:<div>无更多数据</div>
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
        )
    }
}

export default Card_Horizontal;
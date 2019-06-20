import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyInquiry.css';
import Search from '../../components/search/search'
import Consulting from '../../components/consulting/consulting'
import {http} from '../../common/http'
import { ListView, Toast } from 'antd-mobile';
import { getQuery, filterDate } from '../../common/tool';
import {loading_img, default_avatar} from '../../common/images';
import { imgPrefix } from '../../../src/app-config/config.js';


class MyInquiry extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            img_error: false,
            pageIndex: 1,
            pageSize: 10,
            data: [
                // {
                //     jcId: "630196253698822144",
                //     jccContent: "如何关闭苹果Xr拨号的时候的按键音？",
                //     jccIamges: "/admin/image/1553830626575.jpg",
                //     jmId: "55",
                //     jmName: "12313",
                //     jmType: "12313",
                // },
                // {
                //     jcId: "630196253698822144",
                //     jccContent: "如何关闭苹果Xr拨号的时候的按键音？",
                //     jccIamges: "/admin/image/1553830626575.jpg",
                //     jmId: "55",
                //     jmName: "12313",
                //     jmType: "12313",
                // },
                // {
                //     jcId: "630196253698822144",
                //     jccContent: "如何关闭苹果Xr拨号的时候的按键音？",
                //     jccIamges: "/admin/image/1553830626575.jpg",
                //     jmId: "55",
                //     jmName: "12313",
                //     jmType: "12313",
                // },
            ],
            total: '',
            dataSource,
            isLoading: this.props.loading,
        }
    }
    
    componentDidMount () {
    //   this.getMyQuestion()
        this.loadData()
    }

    getMyQuestion = async () => {
      //  let userId = getQuery(localStorage.getItem('query'), 'userId');
        let userId = '419916330402451456';
        let response = await http('/jszx/myquestion', {userId: userId});
        if (response.data) {
            let new_data = [];
            response.data.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({data: new_data})
        } else {
            Toast.info(response.message, 1);
        }
    }

    getValue (event){
        // this.setState({search_value: event.target.value});
        // console.log(this.state.search_value);
    }

    callChat = async () => {
         // 调用原生
         let kefu_data = await http('/jszx/getkefu', {}); 
         let kefu = kefu_data.data.jkCode;
         window.$mobile.openCustomerService({
             agent: kefu, // '927a7ea41bcb56a698c569215f210acc',
            //  message: '类型:' + selected + '\n描述:' + params.jccContent,
         })
    }

    loadData = async (item, pageIndex) => {
        console.log(item, pageIndex)
        let userId = localStorage.getItem('query') !== 'undefined'?getQuery(localStorage.getItem('query'), 'userId'):'419916330402451456';
        let response = await http('/jszx/myquestion', {userId: userId});
        console.log(userId)
        console.log(response);
        if (response.data) {
            let new_data = pageIndex === 1?[]:this.state.data;
            response.data.forEach(element => {
              new_data.push(element);
            });
            this.setState({ 
                total: response.data.total,
                pageIndex: pageIndex?pageIndex+1:this.state.pageIndex + 1,
                data: new_data.reverse(),
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
        console.log(this.props.active_item)
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            this.loadData(this.props.active_item)
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    handleImageErrored = (e) => {
        this.setState({img_error: true})
    }

    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <div onClick={() => this.callChat()} className='my_inquiry_item'>
                    <div className='content_row'>
                        <div style={{"WebkitBoxOrient": "vertical"}} className='jccContent'>{rowData.consultation.jccContent}</div>
                        <div className='detail_info'>
                            <div className='avatar'>
                                <img style={{display:!rowData.member?'block':'none'}} className="img" src={default_avatar}  alt="技术人员头像"/>
                                <img 
                                    // onError={this.handleImageErrored} 
                                    style={{display:rowData.member?'block':'none'}} 
                                    className="img" 
                                    // src={!this.state.img_error?imgPrefix + rowData.member.jmHeadimage:default_avatar} 
                                    src={imgPrefix + rowData.member.jmHeadimage}  
                                    alt="头像"
                                />
                            </div>
                            <div className='jmName'>
                                <span style={{display:rowData.member?'block':'none'}}>{rowData.member.jmName}</span>
                                <span style={{display:!rowData.member?'block':'none'}}>技术人员</span>
                            </div>
                            <div style={{display:rowData.member?'block':'none'}} className='jmType'>{rowData.member.jmType}</div>
                            <div className='jccCreatetime'>{filterDate(rowData.consultation.jccCreatetime)}</div>
                        </div>
                    </div>
                </div>
            );
        };
        return(
            <div className='MyInquiry'>

                <div className='header_box'>
                    <div className='title_ea'>我的咨询</div>
                    <div className="back_search">
                        <Link to="/" className="my_inquiry_back link">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                        <div className="myinquiry_search">
                            <Search history={this.props.history} back="/minquiry" getValue={this.getValue.bind(this)} />
                        </div>
                        <div className='ask_q'>
                            <Consulting back={'/minquiry'} search_expert_icon={'28%'} consulting_title={'48%'} info={'提问'} history={this.props.history}/>
                        </div>
                    </div>
                </div>

                <div className='MyInquiry_Blank'>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        className="my_inquiry_list am-list sticky-list"
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
                    {/* {
                    this.state.data.map((rowData, index) => {
                        return(
                        <div key={index} className='my_inquiry_item'>
                            <div className='content_row'>
                                <div className='jccContent'>{rowData.jccContent}</div>
                                <div >待解答</div>
                            </div>
                        </div>
                        )
                    })
                    } */}
                </div>

            </div>
        )
    }
}

export default MyInquiry;
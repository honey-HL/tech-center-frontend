import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyInquiry.css';
import ComHeader from '../../components/com_header/com_header';
import Search from '../../components/search/search'
import Consulting from '../../components/consulting/consulting'
import {http} from '../../common/http'
import { ListView, Toast } from 'antd-mobile';
import loading_img from '../../assets/images/loading.png';
import { transformTime, getSimpleText } from '../../common/tool'


class MyInquiry extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            data: [
                {
                    jcId: "630196253698822144",
                    jccContent: "如何关闭苹果Xr拨号的时候的按键音？",
                    jccIamges: "/admin/image/1553830626575.jpg",
                    jmId: "55",
                    jmName: "12313",
                    jmType: "12313",
                },
                {
                    jcId: "630196253698822144",
                    jccContent: "如何关闭苹果Xr拨号的时候的按键音？",
                    jccIamges: "/admin/image/1553830626575.jpg",
                    jmId: "55",
                    jmName: "12313",
                    jmType: "12313",
                },
                {
                    jcId: "630196253698822144",
                    jccContent: "如何关闭苹果Xr拨号的时候的按键音？",
                    jccIamges: "/admin/image/1553830626575.jpg",
                    jmId: "55",
                    jmName: "12313",
                    jmType: "12313",
                },
            ],
            total: '',
            dataSource,
            isLoading: this.props.loading,
        }
    }
    
    componentDidMount () {
    //   this.getMyQuestion()
    }

    getMyQuestion = async () => {
        let response = await http('/jszx/myquestion', {userId: 1});
    }

    getValue (event){
        // this.setState({search_value: event.target.value});
        // console.log(this.state.search_value);
    }

    loadData = async (item, pageIndex) => {
        console.log(item, pageIndex)
        let response = await http('/jszx/myquestion', {userId: 1});
        console.log(response);
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

    render(){
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link 
                to={{pathname: 'adetail',state:{id: rowData.jaId, back: this.props.back}}} 
                key={rowID} 
                className='Card_Horizontal'>
                    <div>
                        
                    </div>
                </Link>
            );
        };
        return(
            <div className='MyInquiry'>

                <div className='Baike_Header'>
                    <div className='title_ea'>我的咨询</div>
                    <div className="back_search">
                        <Link to="/" className="home-server-item link">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                        <div className="myinquiry_search">
                            <Search history={this.props.history} back="/minquiry" getValue={this.getValue.bind(this)} />
                        </div>
                        <div className='ask_q'>
                            <Consulting back={'/'} search_expert_icon={'28%'} consulting_title={'48%'} info={'提问'} history={this.props.history}/>
                        </div>
                    </div>
                </div>

                <div className='MyInquiry_Blank'>
                    {/* <ListView
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
                    /> */}
                    {
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
                    }
                </div>

            </div>
        )
    }
}

export default MyInquiry;
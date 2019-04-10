import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Video.css';
import { http } from "../../common/http";
import Search from '../../components/search/search'
import Banner from '../../components/banner/banner'
import { ListView, Toast, Drawer, List } from 'antd-mobile';
import {eye, loading_img} from '../../common/images';

class VideoStream extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            open: true,
            checked: {
                ptId: '',
                pmId: '',
                pbId: ''
            },
            total: '',
            pageIndex: 1,
            pageSize: 10,
            data: [],
            dataSource,
            isLoading: true,
        }
    }

    onEndReached = () => {
        console.log(this.state.data.length)
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            this.loadData(this.state.checked)
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    loadData = async (item) => {
        let obj = {
            brandId: item.pbId,
            typeId: item.ptId,
            modelId: item.pmId,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            title: ''
          }
          let response = await http('/video/videocenter/api/search',obj, true); // true 为线上
          console.log(response)
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

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
      }

    componentDidMount() {
        this.loadData(this.state.checked)
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            const imgPrefix = 'https://jszx.3ceasy.com/video/videocenter/'
            return (
                <Link 
                    to={{pathname: 'detail',state:{id: rowData.jaId, scrollTop:''}}} 
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
        return(
            <div className="VideoStream">
                <div className="VideoStream_inner">
                    <div className="VideoStream_item">
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
                        onEndReachedThreshold={10}
                    />
                    </div>
                </div>
            </div>
        )
    }
}

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            bannerArr: [
                // {
                //     path: require('../../assets/images/1.jpg')
                // },
                // {
                //     path: require('../../assets/images/2.jpg')
                // }
            ]
        }
    }
    getBanner = async () => {
        let res = await http('/video/videocenter/api/getRecommend',{}, true);
        this.setState({bannerArr: res.data});
        console.log(res.data)
    }
    getValue (event){
        this.setState({search_value: event.target.value});
        console.log(this.state.search_value);
    }
    componentDidMount() {
        window.$mobile.navigationShow(false);
        this.getBanner()
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
      }
    handleMenu () {
        this.onOpenChange()
    }
    render() {
        const drag = false
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
              if (index === 0) {
                return (<List.Item key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                  multipleLine
                >Category</List.Item>);
              }
              return (<List.Item key={index}
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              >Category{index}</List.Item>);
            })}
          </List>);
        return(
            <div 
            className="Video"
            style={{
                position:this.state.open?'fixed':'relative',
                top:this.state.open?'0':'',
                left:this.state.open?'0':''
            }}
            >
                <div className='Baike_Header'>
                    <div className='title_ea'>{this.props.title}</div>
                    <div className="back_search">
                        <Link to="/" className="home-server-item link">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                        <div className="search_col_video">
                            <Search history={this.props.history} back="/video" getValue={this.getValue.bind(this)} />
                        </div>
                        <div onClick={() => this.onOpenChange()} className="menu">
                            <img className="img" src={require('../../assets/images/video/menu_icon.png')}  alt="返回"/>
                        </div>
                    </div>
                </div>
                <div className="Video_container">
                    <Drawer
                        enableDragHandle ={drag}
                        position="right"
                        className="my-drawer"
                        style={{
                            zIndex:this.state.open?'9999':'',
                            display: this.state.open?'block':'none', 
                            height: document.documentElement.clientHeight - 80
                         }}
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                    &nbsp;
                    </Drawer>
                    <Banner data={this.state.bannerArr}/>
                    <VideoStream ref={c => {this.videoRef = c;}} />
                </div>
            </div>
        )
    }
}

export default Video;
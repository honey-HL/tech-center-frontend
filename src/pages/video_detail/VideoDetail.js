import React, { Component } from 'react';
import './VideoDetail.css';
import ComHeader from '../../components/com_header/com_header';
import { http } from "../../common/http";
import { ListView, Toast } from 'antd-mobile';
import {onlineImg} from '../../app-config/config'
import {eye,loading_img} from '../../common/images'
import {filterDate} from '../../common/tool'
const YKU = window.YKU

class VideoDetail extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {  
            total: '',
            pageIndex: 1,
            pageSize: 10,
            data: [],
            dataSource,
            isLoading: true,
            hide_cover: false,
            visrc: '',
            viVideoid: '',
            viCover:'',
            viView: '',
            viContent: '',
            viUploaddate: '',
            modelId: '',
            viId: '',
            viTitle: ''
        }
    }
    
    getVideoData = async (viId, from_related) => {
        this.setState({viId: viId})
        let response = await http('/video/videocenter/api/getVideo',{id:viId}, true); // true 为线上
        let data = response.data
        if (data) {
            this.setState({
                viUploaddate: filterDate(data.viUploaddate),
                viContent: data.viContent,
                viView: data.viView,
                viVideoid: data.viVideoid,
                viCover: data.viCover,
                viTitle: data.viTitle
            })
            if (!from_related) { // 默认来源
                this.showVideo(this.state.viVideoid)
            } else { // 从相关视频点过来 
                var parent = document.getElementById("youkuplayer");
                var child = document.getElementsByClassName("ykplayer")[0];
                if (child !=null) {
                    parent.removeChild(child);
                }
                this.showVideo(this.state.viVideoid)
                this.vdetail.scrollIntoView(); // 回到顶部
            }
            this.load(data.pmId)
        } else {
            Toast.info(response.message, 1);
        }
    }

    showVideo (viVideoid) {
        console.log(viVideoid)
        var player = new YKU.Player('youkuplayer',{
            styleid: '0',
            client_id: '1b63c938636b6ee3',
            vid: viVideoid,
            newPlayer: true
        });
    }

    componentDidMount () {
        this.getVideoData(this.props.location.state.id)
        console.log(this.props.location.state.id);
    }

    hideCover () {
        this.setState({hide_cover: true})
    }

    onEndReached = () => {
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            this.load(this.state.modelId)
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    load = async (modelId) => {
        this.setState({modelId: modelId})
        let obj = {
            modelId: modelId,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
        }
        let response = await http('/video/videocenter/api/search',obj, true); // true 为线上
        console.log(response)
        if (response.data) {
            let new_data = this.state.data;
            response.data.data.forEach(element => {
                if (element.viId !== this.state.viId) { // 除去当前的被点的视频
                    new_data.push(element);
                }
            });
            this.setState({ 
                total: response.data.total - 1,
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

    render(){
        const row = (rowData, sectionID, rowID) => {
            const imgPrefix = 'https://jszx.3ceasy.com/video/videocenter/'
            return (
                <div 
                    onClick={() => this.getVideoData(rowData.viId, true)}
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
                </div>
            );
        };
        return(
        <div  
        ref={vdetail => this.vdetail = vdetail}
        className='VideoDetail'>
            <ComHeader history={this.props.history}  from={this.props.location.state.back} title={this.state.viTitle}/>
            <div className='Redius_Blank'>

                <div className='youkuplayer_box'>
                    <div id="youkuplayer">
                        <div 
                        style={{opacity:!this.state.hide_cover?1:0}}
                        className='cover_box'>
                            <img className="viCover" src={onlineImg + this.state.viCover} alt=""/>
                        </div>
                        <div 
                        style={{opacity:!this.state.hide_cover?1:0}}
                        onClick={() => this.hideCover()} className="cover_gray">
                            <img className="play_btn" src={require('../../assets/images/play.png')} alt=""/>
                        </div>
                    </div>
                    <div className="video_info">
                        <div className="title_view">
                            <div className="video_title">{this.state.viTitle}</div>
                            <div className="view_box">
                                <div className="view_eye">
                                    <img src={eye} className='banner_img' alt=""/>
                                </div>
                                <span className="view_num">{this.state.viView}</span>
                            </div>
                        </div>
                        <div className="describe">{this.state.viContent}</div>
                        <div className="upload_time">上传时间: {this.state.viUploaddate}</div>
                    </div>
                </div>

                <div className="section_bar"></div>

                <div className="related_videos">
                    <div className="related_title">相关视频</div>
                    <ListView
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

export default VideoDetail;
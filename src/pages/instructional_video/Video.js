import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Video.css';
import { http } from "../../common/http";
import Search from '../../components/search/search'
import Banner from '../../components/banner/banner'
import { ListView, Toast, Drawer } from 'antd-mobile';
import {eye, loading_img} from '../../common/images';



class VideoStream extends Component {
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
        }
    }

    onEndReached = () => {
        console.log(this.state.data.length)
        if (this.state.data.length < this.state.total) {
            this.setState({isLoading: true})
            this.loadData()
        }
        if (this.state.data.length >= this.state.total || this.state.data.length < this.state.pageSize) {
            this.setState({isLoading: false})
        } 
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    loadData = async (passed_by) => {
        let checked = JSON.parse(window.sessionStorage.getItem('checked'));
        if (passed_by) {
            this.setState({
                data: [],
                pageIndex: 1
            })
        }
        console.log('checked', checked);
        console.log('passed_by', passed_by)
        this.timer = setTimeout(() => {
            this.load(checked)
        })
    }

    load = async (checked) => {
        let obj = {
            brandId: checked&&checked.pbId?checked.pbId:'',
            typeId: checked&&checked.ptId?checked.ptId:'',
            modelId: checked&&checked.pmId?checked.pmId:'',
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

    componentDidMount() {
        if (window.sessionStorage.getItem('checked')) {
            window.sessionStorage.removeItem('checked')
            this.setState({pageIndex: 1})
        }
        this.loadData()
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            const imgPrefix = 'https://jszx.3ceasy.com/video/videocenter/'
            return (
                <Link 
                    to={{pathname: 'vdetail',state:{id: rowData.viId,back: '/video', scrollTop:''}}} 
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
            show_model: false,
            open: false,
            bannerArr: [],
            type_data: [],
            brand_data:[],
            model_data: [],
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
        this.getPhoneType()
        this.getPhoneBrand()
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
        console.log(args);
        this.setState({ open: !this.state.open });
        let type = this.state.type_data
        let brand = this.state.brand_data
        let model = this.state.model_data
        model.forEach(it => {
            it.clicked = false
        })
        brand.forEach(it => {
            it.clicked = false
        })
        type.forEach(it => {
            it.clicked = false
        })
        this.setState({
            checked: {
                ptId: '',
                pmId: '',
                pbId: '',
            },
            show_model: false,
            type_data: type,
            brand_data: brand,
            model_data: model
        })
      }
    handleMenu () {
        this.onOpenChange()
    }
    getPhoneModel = async (brandId) => {
        let response = await http('/video/videocenter/api/getPhoneModel',{brandId: brandId}, true);
        let arr = []
        if (response.data) {
            let data = response.data;
            for (let i in data) {
              data[i].clicked = false;
              arr.push(data[i])
            }
            this.setState({model_data: arr})
           console.log(this.state.brand_data)
        } else {
            Toast.info(response.message, 1);
        }
    }
    submitConfirm = ()=> {
        if (this.state.checked.ptId ==='' || !this.state.checked.ptId) {
            Toast.info('类型必选', 1);
            return
        }
        console.log(this.state.checked);
        console.log(this.videoRef)
          // 刷新数据前存 
        if (window.sessionStorage.getItem('checked')) {
            window.sessionStorage.removeItem('checked')
        }
        window.sessionStorage.setItem('checked', JSON.stringify(this.state.checked))
        this.videoRef.loadData(true)
        //  刷心数据后清空
        this.setState({
            checked: {
                ptId: '',
                pmId: '',
                pbId: ''
            },
            open: false,
        })
    }
    checkedModel = (item) => {
        let arr = this.state.model_data
        arr.forEach(it => {
            it.clicked = false
            if (item.pmId === it.pmId) {
                it.clicked = true;
            }
        })
        let data = Object.assign({}, this.state.checked, { pmId: item.pmId})
        this.setState({
            model_data: arr,
            checked: data,
        })
    }
    checkedType = (item) => {
        let arr = this.state.type_data
        arr.forEach(it => {
            it.clicked = false
            if (item.ptId === it.ptId) {
                it.clicked = true;
            }
        })
        let data = Object.assign({}, this.state.checked, { ptId: item.ptId})
        this.setState({
            type_data: arr,
            checked:data
        })
    }
    checkedBrand = (item) => {
        this.setState({show_model: true})
        this.getPhoneModel(item.pbId)
        let arr = this.state.brand_data
        arr.forEach(it => {
            it.clicked = false
            if (item.pbId === it.pbId) {
                it.clicked = true;
            }
        })
        let data = Object.assign({}, this.state.checked, { pbId: item.pbId})
        this.setState({
            brand_data: arr,
            checked: data,
        })
    }
    getPhoneBrand = async () => {
        let response = await http('/video/videocenter/api/getPhoneBrand',{}, true);
        let arr = []
        if (response.data) {
            let data = response.data;
            for (let i in data) {
              data[i].clicked = false;
              arr.push(data[i])
            }
            this.setState({brand_data: arr})
           console.log(this.state.brand_data)
        } else {
            Toast.info(response.message, 1);
        }
     }
    getPhoneType = async () => {
        let response = await http('/video/videocenter/api/getPhoneType',{}, true);
        let arr = []
        if (response.data) {
            let data = response.data;
            for (let i in data) {
              data[i].clicked = false;
              arr.push(data[i])
            }
            this.setState({type_data: arr})
        } else {
            Toast.info(response.message, 1);
        }
    }
    render() {
        const drag = false
        const sidebar = (<div style={{ height: document.documentElement.clientHeight - 93}} className='sidebar'>
           <div className='sidebar_head'>
                <div onClick={this.onOpenChange} className='sidebar_back'>
                    <div className='back_orange'>
                        <img className='img' alt='back' src={require('../../assets/images/back_orange.png')}/>
                    </div>
                </div>
                <div className='sidebar_title'>导航</div>
            </div>
            <div 
            style={{ height: document.documentElement.clientHeight - 93 - 38- 50}}
            className='sidebar_container'>
                <div className='sidebar_type'>
                    <div className='sidebar_secondary_title'>类型</div>
                    <div className="sidebar_type_wraper">
                    {
                        this.state.type_data.map((item, index) => {
                            return(
                                <div onClick={() => this.checkedType(item)} key={index} className={`type_wraper_item ${item.clicked?'sidebar_clicked':''}`}>{item.ptName}</div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='sidebar_brand'>
                    <div className='sidebar_secondary_title'>品牌</div>
                    <div className="sidebar_brand_wraper">
                    {
                        this.state.brand_data.map((item, index) => {
                            return(
                                <div onClick={() => this.checkedBrand(item)} key={index} className={`type_wraper_item ${item.clicked?'sidebar_clicked':''}`}>{item.pbName}</div>
                            )
                        })
                    }
                    </div>
                </div>
                <div
                style={{display:this.state.show_model?'block':'none'}}
                 className='sidebar_model'>
                    <div className='sidebar_secondary_title'>型号</div>
                    <div className="sidebar_brand_wraper">
                    {
                        this.state.model_data.map((item, index) => {
                            return(
                                <div onClick={() => this.checkedModel(item)} key={index} className={`type_wraper_item ${item.clicked?'sidebar_clicked':''}`}>{item.pmName}</div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="sidebar_bottom">
                <div onClick={() => this.onOpenChange()} className="sidebar_cancel">返回</div>
                <div onClick={() => this.submitConfirm()} className="sidebar_confirm">确定</div>
            </div>
          </div>);
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
                    <div className="back_search_mennu">
                        <Link onClick={() => this.removeSession()} to="/" className="video_back">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                        <div className="search_col_video">
                            <Search history={this.props.history} back="/video" getValue={this.getValue.bind(this)} />
                        </div>
                        <div onClick={() => this.onOpenChange()} className="menu_box">
                            <div className="menu">
                                <img className="img" src={require('../../assets/images/video/menu_icon.png')}  alt="返回"/>
                            </div>
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
                            height: document.documentElement.clientHeight - 70
                         }}
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                    &nbsp;
                    </Drawer>
                    <Banner from={'video'} history={this.props.history} data={this.state.bannerArr}/>
                    <VideoStream ref={c => {this.videoRef = c;}} />
                </div>
            </div>
        )
    }
}

export default Video;
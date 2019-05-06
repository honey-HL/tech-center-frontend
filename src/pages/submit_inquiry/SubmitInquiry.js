import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SubmitInquiry.css';
import ComHeader from '../../components/com_header/com_header';
import { TextareaItem, ImagePicker, Picker, Toast, List } from 'antd-mobile';
import {http} from '../../common/http'
import { baseUrl } from "../../app-config/config.js";
import { imgPrefix } from '../../../src/app-config/config.js';
import { getQuery } from '../../common/tool';


class QJPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_qjp: false,
            experts: [],
            jcImage: '',
            id: '',
            jcName: '',
        }
    }

    getTechCenterInfo = async (id) => {
        let response = await http('/jszx/getcenter', {id: id}); 
        console.log(response)
        if (response.data) {
            this.setState({
                jcImage: response.data.center.jcImage,
                jcName: response.data.center.jcName,
                experts: response.data.user,
            })
        } else {
            Toast.info(response.message, 1);
        }
    }

    componentWillReceiveProps(nextProps){
        let self = this;
        self.qjpopup.scrollIntoView(); // 回到顶部
        setTimeout(function(){
            if (nextProps.id && nextProps.id !== '') {
                self.getTechCenterInfo(nextProps.id)
            }
            self.setState({
                show_qjp: nextProps.show
            })
        },0)
    }

    onScrollHandle = () => {
        console.log(this.qjpopup.scrollTop)
      };

    hide = () => {
        this.setState({
            show_qjp: !this.state.show_qjp,
        }, () => {
            console.log('hide ', this.state.show_qjp)
            this.props.updateShow(this.state.show_qjp)
        })
    }

    prevent = (event) => {
        event.cancelBubble = true
        event.stopPropagation()
        console.log('prevent')
        this.setState({
            show_qjp: true,
        }, () => {})
    }

    componentWillMount () {
    }

    componentDidMount () {
    }

    render () {
        return(<div
        onClick={() => this.hide()}
        className={`${this.state.show_qjp?'QJPopup':'hide_qjp'}`}
        >
            <div 
            onScrollCapture={() => this.onScrollHandle()}
            ref={qjpopup => this.qjpopup = qjpopup}
            onClick={event => this.prevent(event)} className='qj_picker'>
                <div className='qj_picker_title'>{this.state.jcName}</div>
                <div className='jcImage'>
                    <img className="banner_img" src={imgPrefix + this.state.jcImage} alt="" />
                </div>
                <div className='tc_staff_structure'>
                    <div>架构云图</div>
                    <div className='cloud_structure'>
                        <img className="banner_img" src={require('../../assets/images/qjs.png')} alt="" />
                    </div>
                </div>
                <div className='experts'>
                    <div className='experts_title'>专家团队</div>
                    <div className='experts_container'>
                    {
                        this.state.experts.map((item, index) => {
                            return(
                                <div className='single_person' key={index}>
                                    <div className='avatar'>
                                        <img className="banner_img" src={imgPrefix + item.jmHeadimage} alt="" />
                                    </div>
                                    <div>{item.jmName}</div>
                                    <div>{item.jmType}</div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>)
    }
}

class SubmitInquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_qjp: false,
            jcId: '',
            form: '',
            jcName: '',
            province: [],
            files: [],
            uploaded: [],
            selected_count: 0,
            t_value: '',
            q_list:[
                // {
                //     name: '手机屏幕'
                // },
                // {
                //     name: '手机屏幕'
                // },{
                //     name: '手机屏幕'
                // },{
                //     name: '手机屏幕'
                // },{
                //     name: '手机屏幕'
                // },{
                //     name: '手机屏幕'
                // }, {
                //     name: '手机屏幕'
                // }, {
                //     name: '手机屏幕'
                // },
            ],
            arrValue: ['510000', '510100']
        }
    }
    
    componentDidMount () {
        console.log(this.props.back);
        this.autoFocusInst.focus();
        this.getProvince()
        this.getQuestionClassification()
    }

    getQuestionClassification = async () => {
        let response = await http('/jszx/questiontype', {}); 
        let new_arr = []
        if (response.data) {
            // for(var i=0; i<response.data.length; i+=3){
            //     new_arr.push(response.data.slice(i,i+3));
            // }
            response.data.forEach(item => {
                new_arr.push({
                    name: item.name,
                    id: item.id,
                    selected: false,
                })
            })
            this.setState({q_list:new_arr})
        } else {
            Toast.info(response.message, 1);
        }
    }

    getCity = async (pid) => {
        let response = await http('/jszx/arealist', {pid: pid}); 
        let province = this.state.province;
        let val = this.state.arrValue;
        if (response.data) {
            let new_data = []
            response.data.forEach(element => {
                new_data.push({
                    label: element.name,
                    value: element.id,
                })
            });
            province.forEach(item => {
                if (item.value === this.state.arrValue[0]) {
                    item.children = new_data;
                }
            })
            val[1] = new_data&&new_data[0]&&new_data[0].value?new_data[0].value: '';
            this.setState({
                arrValue: val,
                province:province,
            })
            this.getTechCenter()
            console.log(this.state.arrValue);
        } else {
            Toast.info(response.message, 1);
        }
    }

    getProvince = async () => {
        let response = await http('/jszx/arealist', {pid: 0}); 
        if (response.data) {
            let new_data = []
            response.data.forEach(element => {
                new_data.push({
                    label: element.name,
                    value: element.id,
                })
            });
            this.setState({
                province:new_data
            })
            this.getCity(this.state.arrValue[0])
        } else {
            Toast.info(response.message, 1);
        }
    }

    getTechCenter = async() => {
        let params = {
            provinceId: this.state.arrValue[0],
            cityId: this.state.arrValue[1],
        }
        let response = await http('/jszx/centerlist', params); 
        if (response.data) {
            if (response.data.length > 0) {
                this.setState({
                    jcId: response.data[0].jcId,
                    jcName: response.data[0].jcName
                }, () => {
                    console.log(this.state.jcId)
                })
            } else {
                this.setState({
                    jcId: '',
                    jcName: '',
                })
                Toast.info('该地区没有技术中心', 1);
            }
            console.log(response.data);
        } else {
            Toast.info(response.message, 1);
        }
    }

    onOk = async (item) => {
        console.log(this.state.arrValue);
        this.getTechCenter()
    }

    onPickerChange = (item) => {
        console.log(item);
        let val = this.state.arrValue;
        if (item[0] !== this.state.arrValue[0]) { // 省变了
            val[0] = item[0]
            val[1] = item[1]
            this.getCity(item[0])
        } else {
            val[0] = item[0]
            val[1] = item[1]
        }
        this.setState({
            arrValue: val,
        })
    }

    uploadImages = async (files, type, index) => {
        if (type === 'add') {
            this.uploadFile(files[0])
        } else {
            let images = this.state.uploaded;
            images.splice(index, 1);
            this.setState({
                uploaded: images
            })
            console.log(files, index)
            console.log(this.state.uploaded);
        }
        this.setState({
            files: files
        })
    }

    uploadFile(fileObj) {
        let that = this
        fileObj = fileObj.file;
        let xhr;
        let form = new FormData();
        form.append("file", fileObj);
        xhr = new XMLHttpRequest();
        xhr.open("post", baseUrl + '/jszx/uploadImg', true);
        xhr.onload = (evt) => {
            let data = JSON.parse(evt.target.responseText);
            console.log(data);
            that.uploadComplete(data.data)
        };
        xhr.send(form); //开始上传，发送form数据
    }

    uploadComplete (img) {
        let arr = this.state.uploaded;
        arr.push(img)
        this.setState({
            uploaded: arr
        }, () => {
            console.log(this.state.uploaded)
        })
    }

    getTextarea (val) {
        this.setState({
            t_value: val
        })
        console.log(val)
    }

    selectTags = (item) => {
        console.log(item)
        console.log('selectTags')
        let list = this.state.q_list
        list.forEach(element => {
            if (element.id === item.id) {
                if (!item.selected) {
                    element.selected = true
                    this.setState({selected_count: this.state.selected_count + 1},()=>{
                        console.log(this.state.selected_count);
                    })      
                } else {
                    // if (this.state.selected_count <= 1) {
                    //     return
                    // }
                    this.setState({selected_count: this.state.selected_count - 1},()=>{
                        console.log(this.state.selected_count);
                        if (this.state.selected_count < 1) {
                            Toast.info('至少选择一个问题类型', 1);
                        }
                    })      
                    element.selected = false
                }
            }
        }) 
        this.setState({
            q_list: list
        }, () => {
            console.log(this.state.q_list);
        })
    }

    validating = () => {
        let params = {}
        if (this.state.jcId.length > 0) {
            params.jcId = this.state.jcId
        } else {
            Toast.info('技术中心必选', 1);
            return
        }
        if (this.state.t_value.length > 0) {
            params.jccContent = this.state.t_value
        } else {
            Toast.info('问题内容必填', 1);
            return
        }
        if (this.state.uploaded.length > 0) {
            if (this.state.uploaded.length <= 1) {
                params.jccIamges = this.state.uploaded[0]
            } else {
                params.jccIamges = this.state.uploaded.join(',');
                // console.log(params.jccIamges)
            }
        } else {
            Toast.info('至少上传一张图片', 1);
            return
        }
        let jccType = []
        let selected = []
        this.state.q_list.forEach(item => {
            if (item.selected) {
                selected.push(item.name)
                jccType.push(item.id)
            }
        })
        if (jccType.length > 0) {
            if (jccType.length === 1) {
                selected = selected[0]
                params.jccType = jccType[0]
            } else {
                selected = selected.join(', ');
                params.jccType = jccType.join(",");
            }
        } else {
            Toast.info('至少选择一个问题类型', 1);
            return
        }
        console.log(params, selected)
        this.submitAll(params, selected);
    }

    submitAll = async (params, selected) => {
        console.log(localStorage.getItem('query'))
        let userId = getQuery(localStorage.getItem('query'), 'userId');
        params.jccUserid = userId;
        console.log(userId)
        let response = await http('/jszx/addquestion', params); 
        if (response.data) {
            Toast.success('提交成功', 1);
        }
        // 调用原生
        let kefu_data = await http('/jszx/getkefu', {}); 
        let kefu = kefu_data.data.jkCode;
        window.$mobile.openCustomerService({
            agent: kefu, // '927a7ea41bcb56a698c569215f210acc',
            message: '类型:' + selected + '\n描述:' + params.jccContent,
        })
    }

    showQJPopup = () => {
        console.log('2333')
        if (this.state.jcName !== '') {
            this.setState({
                show_qjp: !this.state.show_qjp,
            })
        }
    }

    updateShow = (show) => {
        console.log(show, 'updateShow')
        this.setState({
            show_qjp: show
        })
    }

    render(){
        return(
            <div className='SubmitInquiry'>

                <ComHeader history={this.props.history}  from={this.props.location.state.back} title={'咨询专家'}/>
                
                <QJPopup updateShow= {this.updateShow} show={this.state.show_qjp} id={this.state.jcId}/>

                <div className='Redius_Blank'>
                    <div className="area_box">
                        <div className='reminder'>您正在咨询</div>
                        <div className="jcName" onClick={() => this.showQJPopup()}>{this.state.jcName}</div>
                        <Picker className='picker_area' extra="请选择(可选)"
                            value={this.state.arrValue}
                            data={this.state.province}
                            title="选择地区"
                            onPickerChange={this.onPickerChange}
                            onOk={this.onOk}
                            onDismiss={e => console.log('dismiss', e)}
                            >
                            <List.Item className='reminder_box' arrow="horizontal">
                            </List.Item>
                        </Picker>
                    </div>
                    <div className="section_bar"></div>
                    <div className='content_box'>
                        <TextareaItem
                            onChange = {val => this.getTextarea(val)}
                            value = {this.state.t_value}
                            ref={el => this.autoFocusInst = el}
                            autoFocus='autofocus'
                            rows={4}
                            maxLength="500"
                            count={500}
                            placeholder="在此输入问题......"
                        />
                        {/* <textarea
                            onChange = {val => this.getTextarea(val)}
                            value = {this.state.t_value}
                            contentEditable="true"
                            ref={el => this.autoFocusInst = el}
                            autoFocus='autofocus'
                            rows={4}
                            maxLength="500"
                            count={500}
                            placeholder="在此输入问题......"
                        /> */}
                    </div>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.uploadImages}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.files.length < 3}
                        multiple={this.state.multiple}
                    />
                    <div className="section_bar"></div>
                    <div className='question_classification'>
                        <div className='select_tag'>选择问题分类（可多选）</div>
                        <div className="question_box">
                        {
                            this.state.q_list.map((item, id) => {
                                return(
                                    <div 
                                    onClick={() => this.selectTags(item)} 
                                    className={`question_item ${item.selected?'selected_tag':'question_item'}`}
                                    key={id}>
                                    {item.name}
                                </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className='submit_inq'>
                        <div
                         onClick={() => this.validating()} 
                          className='sub_btn'>
                            提交咨询
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SubmitInquiry;
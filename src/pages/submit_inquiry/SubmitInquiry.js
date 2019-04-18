import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SubmitInquiry.css';
import ComHeader from '../../components/com_header/com_header';
import { TextareaItem, ImagePicker, Picker, Toast, List } from 'antd-mobile';
import {http} from '../../common/http'


class SubmitInquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: '',
            jcName: '',
            province: [],
            files: [],
            t_value: '',
            q_list:[
                {
                    name: '手机屏幕'
                },
                {
                    name: '手机屏幕'
                },{
                    name: '手机屏幕'
                },{
                    name: '手机屏幕'
                },{
                    name: '手机屏幕'
                },{
                    name: '手机屏幕'
                }, {
                    name: '手机屏幕'
                }, {
                    name: '手机屏幕'
                },
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
                new_arr.push(item)
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
            val[1] = new_data[0].value
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
                    jcName: response.data[0].jcName
                })
            } else {
                this.setState({
                    jcName: '暂无技术中心',
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

    uploadImages = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    getTextarea (val) {
        this.setState({
            t_value: val
        })
        console.log(val)
    }

    checkTags = (item) => {

    }

    render(){
        return(
            <div className='SubmitInquiry'>

                <ComHeader history={this.props.history}  from={this.props.location.state.back} title={'咨询专家'}/>

                <div className='Redius_Blank'>
                    <div className="area_box">
                        <Picker extra="请选择(可选)"
                            value={this.state.arrValue}
                            data={this.state.province}
                            title="选择地区"
                            onPickerChange={this.onPickerChange}
                            onOk={this.onOk}
                            onDismiss={e => console.log('dismiss', e)}
                            >
                            <List.Item className='reminder_box' arrow="horizontal">
                                <div className='reminder'>您正在咨询</div>
                                {this.state.jcName}
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
                    </div>
                    <input type="file" accept="image/*"/>
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
                                    <div onClick={(item) => this.checkTags(item)} className='question_item' key={id}>
                                    {item.name}
                                </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SubmitInquiry;
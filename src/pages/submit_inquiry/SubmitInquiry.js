import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SubmitInquiry.css';
import ComHeader from '../../components/com_header/com_header';
import { Picker,List } from 'antd-mobile';
// import { district, provinceLite } from 'antd-mobile-demo-data';


class SubmitInquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sValue: ''
        }
    }
    
    componentDidMount () {
      
    }

    onChange = (value) => {
        console.log(value);
        // this.setState({
        //   locale: value[0],
        // });
    }

    render(){
        const seasons = [
            [
              {
                label: '2013',
                value: '2013',
              },
              {
                label: '2014',
                value: '2014',
              },
            ],
            [
              {
                label: '春',
                value: '春',
              },
              {
                label: '夏',
                value: '夏',
              },
            ],
          ];
        return(
            <div className='SubmitInquiry'>
                <ComHeader history={this.props.history}  from={this.props.back} title={'咨询专家'}/>
                <div className='Redius_Blank'>
                    <div className="area_box">
                    <Picker
                        data={seasons}
                        title="选择季节"
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue}
                        onChange={item => this.onChange(item)}
                        onOk={v => this.setState({ sValue: v })}
                        >
                        <List.Item arrow="horizontal">Multiple</List.Item>
                    </Picker>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitInquiry;
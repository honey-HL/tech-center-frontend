import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './consulting.css';
import ask from '../../assets/images/home/ask.png';
import { http } from "../../common/http.js";


class Consulting extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleBack = (e) => {
        // console.log('this.location.query', this.location.query);
        // this.props.history.push({pathname: '/'});
    }
    componentDidMount () {
        console.log(this.props.from)
    }
    render(){
        return(
            <div className='expert_btn'>
                <div className="search_expert_icon">
                    <img className="consulting" src={ask} alt="咨询专家" />
                </div>
                <div className="consulting_title">
                    咨询专家
                </div>
            </div>
        )
    }
}

export default Consulting;
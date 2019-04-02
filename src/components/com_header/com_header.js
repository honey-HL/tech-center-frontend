import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './com_header.css';
import { http } from "../../common/http.js";


class Com_Header extends Component {
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
            <div className='Com_Header'>
                <div className="Com_Header_row">
                    <Link to={this.props.from} className='back'>
                        <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                    </Link>
                    <div className="title_box">
                        {this.props.title}
                    </div>
                </div>
                <div className="white"></div>
            </div>
        )
    }
}

export default Com_Header;
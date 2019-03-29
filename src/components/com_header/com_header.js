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
    render(){
        return(
            <div className='Com_Header'>
                <Row className="Com_Header_row" type="flex" justify="center" align="middle">
                    <Col span={1}>
                        <Link to="/" className="">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                    </Col>
                    <Col className="title_box" span={22}>
                        {this.props.title}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Com_Header;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input } from 'antd';
import './Encyclopedia.css';
import { http } from "../../common/http.js";

class Encyclopedia extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {}
    render() {
        return(
            <div className="Encyclopedia">Encyclopedia</div>
        )
    }
}
export default Encyclopedia;
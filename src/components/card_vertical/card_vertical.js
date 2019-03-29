import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './card_vertical.css';
import { http } from "../../common/http.js";
import eye from '../../assets/images/home/eye.png';
import heart from '../../assets/images/home/heart.png';


class Card_Vertical extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className='Card_Vertical'>
                <div className="Card_Vertical_cover">
                    <img className="banner_img" src={this.props.data.src} alt="banner" />
                </div>
                <div className="Card_Vertical_title" style={{'WebkitBoxOrient':'vertical'}}>{this.props.data.title}</div>
                <div className="Card_Vertical_view_box">
                    <div className='eye'>
                        <img className="img_float" src={eye} alt="浏览量" />
                    </div>
                    <span className='Card_Vertical_view_num'>{this.props.data.view}</span>
                </div>
            </div>
        )
    }
}

export default Card_Vertical;
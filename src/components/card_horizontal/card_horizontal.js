import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './card_horizontal.css';
import eye from '../../assets/images/home/eye.png';
import heart from '../../assets/images/home/heart.png';
import { imgPrefix } from '../../../src/app-config/config.js';


class Card_Horizontal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className='Card_Horizontal'>
                <div className='Card_Horizontal_item'>
                    <div className="Card_Horizontal_left">
                        <div className='info_content' style={{"WebkitBoxOrient": "vertical"}}>{this.props.info.jaTitle}</div>
                        <div className="view_like">
                            <div className='in_block'>
                                <div className='eye'><img className="banner_img" src={eye} alt="banner" /></div>
                                <span className='in_block view_num'>{this.props.info.jaView}</span>
                            </div>
                            <div className='heart_box in_block'>
                                <div className='eye'><img className="banner_img" src={heart} alt="banner" /></div>
                                <span className='in_block'>{this.props.info.jaLike}</span>
                            </div>
                        </div>
                    </div>
                    <div className="Card_Horizontal_right_img">
                        {/* <img className="banner_img" src={this.props.info.jaImage} alt="banner" /> */}
                        <img className="banner_img" src={imgPrefix + this.props.info.jaImage} alt="banner" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Card_Horizontal;
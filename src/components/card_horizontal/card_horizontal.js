import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './card_horizontal.css';
import eye from '../../assets/images/home/eye.png';
import heart from '../../assets/images/home/heart.png';


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
                        <div className='info_content' style={{"WebkitBoxOrient": "vertical"}}>{this.props.info.content}</div>
                        <div className="view_like">
                            <div className='in_block'>
                                <div className='eye'><img className="banner_img" src={eye} alt="banner" /></div>
                                <span className='in_block view_num'>{this.props.info.view}</span>
                            </div>
                            <div className='heart_box in_block'>
                                <div className='eye'><img className="banner_img" src={heart} alt="banner" /></div>
                                <span className='in_block'>{this.props.info.heart}</span>
                            </div>
                        </div>
                    </div>
                    <div className="Card_Horizontal_right_img">
                            <img className="banner_img" src={this.props.info.src} alt="banner" />
                        </div>
                </div>
            </div>
        )
    }
}

export default Card_Horizontal;
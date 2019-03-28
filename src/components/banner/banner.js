import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './banner.css';
import { http } from "../../common/http.js";



class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return(
            <div className="banner">
                <Carousel>
                {this.props.data.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>
                            <img className="banner_img" src={item.path} alt="banner" />
                        </div>
                      </div>
                    )
                })}
                </Carousel>
            </div>
        )
    }
}

export default Banner;
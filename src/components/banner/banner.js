import React, { Component } from 'react';
import { Carousel } from 'antd';
import './banner.css';
import { http } from "../../common/http.js";
import { imgPrefix, onlinePrefix } from '../../../src/app-config/config.js';
import { filterLink } from '../../common/tool'


class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    bannerView = async (bannerId) => {
        await http('/jszx/bannerview', {bannerId: bannerId});
    }
    render() {
        return(
            <div className="banner">
                <Carousel>
                {this.props.data.map((item, index) => {
                    return (
                      <div key={index}>
                        <a onClick={() => this.bannerView(item.jbId)} href={filterLink(item.jbLink)} className="banner_box">
                            <img className="banner_img" src={item.rCover?onlinePrefix+'/video/videocenter'+item.rCover:imgPrefix + item.jbImage} alt="banner" />
                        </a>
                      </div>
                    )
                })}
                </Carousel>
            </div>
        )
    }
}

export default Banner;
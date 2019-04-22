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
    bannerView = async (item) => {
        if (this.props.from === 'video') {
            this.props.history.push({
                pathname: "/vdetail",
                state: {
                    back: '/video',
                    id: item.rLink
                }
            });
        } else {
            await http('/jszx/bannerview', {bannerId: item.jbId});
            window.location.href = filterLink(item.jbLink);
        }
    }
    render() {
        return(
            <div className="banner">
                <Carousel>
                {this.props.data.map((item, index) => {
                    return (
                      <div key={index}>
                        <div onClick={() => this.bannerView(item)} className="banner_box">
                            <img className="banner_img" src={item.rCover?onlinePrefix+'/video/videocenter'+item.rCover:imgPrefix + item.jbImage} alt="banner" />
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
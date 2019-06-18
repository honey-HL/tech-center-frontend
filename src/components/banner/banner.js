import React, { Component } from 'react';
// import { Carousel } from 'antd';
import { Carousel } from 'antd-mobile';
import './banner.css';
import { http } from "../../common/http.js";
import { imgPrefix, onlinePrefix } from '../../../src/app-config/config.js';
import { filterLink } from '../../common/tool'
import { cover } from '../../common/images';


class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img_error: false,
        }
    }
    bannerView = async (item) => {
        if (this.props.from === 'video') {
            this.props.history.push({
                pathname: "/vdetail/" + item.rLink,
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

    handleImageErrored = (e) => {
        this.setState({img_error: true})
    }

    render() {
        return(
            <div className="banner">
                <Carousel>
                {this.props.data.map((item, index) => {
                    return (
                      <div key={index}>
                        <div onClick={() => this.bannerView(item)} className="banner_box">
                            <img className="banner_img" 
                                onError={this.handleImageErrored} 
                                src={item.rCover?onlinePrefix+'/video/videocenter'+item.rCover:!this.state.img_error?imgPrefix + item.jbImage:cover} 
                                alt="banner" 
                            />
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
import React, { Component } from 'react';
// import { Carousel } from 'antd';
import { Carousel } from 'antd-mobile';
import './banner.css';
import { http } from "../../common/http.js";
import { imgPrefix, onlinePrefix } from '../../../src/app-config/config.js';
import { filterLink } from '../../common/tool'
import { cover } from '../../common/images';
import ComImage from '../image/image';


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
            if (this.props.from === '/') {
                window.sessionStorage.setItem('isBackHome', 1);
            }
            await http('/jszx/bannerview', {bannerId: item.jbId});
            window.location.href = filterLink(item.jbLink);
        }
    }

    handleImageErrored = (e) => {
        this.setState({img_error: true})
    }

    componentDidMount () {
        console.log(this.props.from);
    }

    render() {
        return(
            <div className="banner">
                <Carousel>
                {this.props.data.map((item, index) => {
                    return (
                      <div key={index}>
                        <div onClick={() => this.bannerView(item)} className="banner_box">
                            <ComImage defaultImg={cover} imageUrl={item.rCover?onlinePrefix+'/video/videocenter'+item.rCover:imgPrefix + item.jbImage} />
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
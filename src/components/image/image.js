import React from 'react';
import {cover} from '../../common/images';

/**
 * 图片加载失败就显示默认图片
 */
class Img extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            imageUrl: this.props.imageUrl
        };
    }

    handleImageLoaded() {
     
    }

    componentDidMount () {
        this.setState({ 
            imageUrl:  this.props.imageUrl
        });
    }

    handleImageErrored = () => {
        this.setState({ 
            imageUrl: this.props.defaultImg !== undefined?this.props.defaultImg: cover
        });
    }

    componentWillReceiveProps (props, nextProps) {
        this.setState({ 
            imageUrl: props.imageUrl
        });
    }

    render() {
        return (
            <img className="wh_100" 
                alt="默认图片"
                src={this.state.imageUrl}
                // src={this.props.imageUrl}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
            />
        );
    }
}
export default Img;
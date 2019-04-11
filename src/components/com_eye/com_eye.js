import React, { Component } from 'react';
import './com_eye.css';
import eye from '../../assets/images/home/eye.png';
// import heart from '../../assets/images/home/heart.png';


class ComEye extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className='eye_inline'>
                <div className='eye'>
                    <img className="banner_img" src={eye} alt="banner" />
                </div>
                <span className='eye_inline'>{this.props.view}</span>
            </div>
        )
    }
}

export default ComEye;
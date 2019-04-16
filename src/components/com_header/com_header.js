import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './com_header.css';


class Com_Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleBack = (e) => {
        // console.log('this.location.query', this.location.query);
        // this.props.history.push({
        //     pathname: this.props.from,
        //     state: {
        //         from: this.props.history.location.state.origin,
        //     }
        // });
        this.props.history.goBack()
        // window.history.back()
    }
    componentDidMount () {
        console.log(this.props.from)
    }
    render(){
        return(
            <div className='Com_Header'>
                <div className="Com_Header_row">
                    <div onClick={() => this.handleBack()} className='back'>
                        <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                    </div>
                    <div className="title_box">
                        {this.props.title}
                    </div>
                </div>
                <div className="white"></div>
            </div>
        )
    }
}

export default Com_Header;
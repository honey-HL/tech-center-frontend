import React, { Component } from 'react';
import './consulting.css';
import ask from '../../assets/images/home/ask.png';


class Consulting extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleBack = (e) => {
        // console.log('this.location.query', this.location.query);
        // this.props.history.push({pathname: '/'});
    }
    componentDidMount () {
        console.log(this.props.from)
    }
    submitConsulting = () => {
        this.props.history.push({
            pathname: 'sinquiry',
            state: {
                back: this.props.back,
            }
        })
    }
    render(){
        return(
            <div onClick={() => this.submitConsulting()} className='expert_btn'>
                <div 
                style={{width: this.props.search_expert_icon}}
                className="search_expert_icon">
                    <img className="consulting" src={ask} alt="咨询专家" />
                </div>
                <div 
                style={{width: this.props.consulting_title}}
                className="consulting_title">
                    {this.props.info}
                </div>
            </div>
        )
    }
}

export default Consulting;
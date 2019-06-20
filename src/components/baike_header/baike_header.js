import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './baike_header.css';
import Search from '../../components/search/search';


class Baike_Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleBack = (e) => {
        this.props.history.goBack();
    }
    getValue (event){
        this.setState({search_value: event.target.value});
        console.log(this.state.search_value);
    }
    componentDidMount () {
        console.log(this.props.from)
    }
    render(){
        return(
            <div className='Baike_Header'>
               <div className='title_ea'>{this.props.title}</div>
                <div className="back_search">
                    <div onClick={() => this.handleBack()} className="home-server-item link">
                        <div className='back'>
                            <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                        </div>
                    </div>
                    <div className="search_col">
                        <Search type={this.props.type} history={this.props.history} back="/encyclopedia" getValue={this.getValue.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Baike_Header;
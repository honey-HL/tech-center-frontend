import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './baike_header.css';
import { http } from "../../common/http.js";
import Search from '../../components/search/search';


class Baike_Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleBack = (e) => {
        // console.log('this.location.query', this.location.query);
        // this.props.history.push({pathname: '/'});
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
               <div className='title_ea'>问问百科</div>
                <div className="back_search">
                    <Link to="/" className="home-server-item link">
                        <div className='back'>
                            <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                        </div>
                    </Link>
                    <div className="search_col">
                        <Search history={this.props.history} back="/encyclopedia" getValue={this.getValue.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Baike_Header;
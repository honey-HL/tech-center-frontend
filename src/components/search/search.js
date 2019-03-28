import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Input, Tabs } from 'antd';
import './search.css';
// import { http } from "../common/http.js";
import search_icon from '../../assets/images/home/search.png';



class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inner: ''
        }
    }
    blurSearch () {

    }
    validateValue(event) {
        // debugger
        if (event.keyCode==32 || event.which == 32) {
            return false;
        }
        console.log(event.keyCode)
    }
    handleVal (event) {
        let val = event.target.value;
        if (val === ' ') {
            return ''
        }
        // console.log(event.target.value);
        // if ()
        // debugger
        // if (event.keyCode==32) {
        //     return false;
        // }
        // if (event.keyCode==32 || event.which == 32) {
        //     return;
        // }
        // let val = this.refs.search.value.replace(/\s+/g,"");
        // val = val.replace(/\s+/g,"");
        // this.props.getValue(val);
        // console.log(val);
    }
    componentDidMount () {}
    render() {
        return(
            <div className='Search'>
                  <Input ref="search"
                  onChange={this.props.getValue}
                  onKeyDown={(event) => this.validateValue(event)}
                  onKeyUp={(event) => {this.handleVal(event);}}
                  onBlur={this.blurSearch}
                  className='search_question' placeholder="搜索问题" />
                <div className="search_icon">
                    <img className="img_search" src={search_icon} alt="搜索" />
                </div>
            </div>
        )
    }
}

export default Search;
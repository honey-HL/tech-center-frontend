import React, { Component } from 'react';
import './search.css';
// import { http } from "../common/http.js";
import search_icon from '../../assets/images/home/search.png';



class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_key: '',
            inner: ''
        }
    }
    blurSearch () {

    }
    validateValue(event) {
        // debugger
        // if (event.keyCode==32 || event.which == 32) {
        //     return false;
        // }
        // console.log(event.keyCode)
    }
    handleVal =  (event) => {
        let val = event.target.value.replace(/\s+/g,"");;
        this.setState({search_key: val})
    }
    handleKeyUp(e) {
        if (e.keyCode === 13) {
            this.props.history.push({
                pathname: "/result",
                state: {
                    from: this.props.back
                }
            });
        }
    }
    submitQuestion = (search_key) => {
        console.log(this.props.back);
        console.log(search_key);
        // debugger
        console.log('出发了额');
        this.props.history.push({
            pathname: "/result",
            state: {
                from: this.props.back
            }
        });
    }
    focusInput = () => {
        this.props.history.push({
            pathname: "/result",
            state: {
                from: this.props.back
            }
        });
    }
    componentWillMount () {
        console.log('back : ', this.props.back);
    }
    componentDidMount () {
    }
    render() {
        return(
            <div className='Search'>
                <input
                    ref="search"
                    value={this.state.search_key}
                    type='text'
                    maxLength="40"
                    onChange={(event) => this.handleVal(event)}
                    onKeyDown={(event) => this.validateValue(event)}
                    onKeyUp={(e) => this.handleKeyUp(e)}
                    onBlur={this.blurSearch}
                    onFocus={this.focusInput}
                    className='search_question'
                    placeholder="搜索问题" />
                <div onClick={() => this.submitQuestion(this.state.search_key)} className="search_icon">
                    <img className="img_search" src={search_icon} alt="搜索" />
                </div>
            </div>
        )
    }
}

export default Search;
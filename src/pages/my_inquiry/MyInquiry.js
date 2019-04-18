import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyInquiry.css';
import ComHeader from '../../components/com_header/com_header';
import Search from '../../components/search/search'
import Consulting from '../../components/consulting/consulting'


class MyInquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    componentDidMount () {
      
    }

    getValue (event){
        // this.setState({search_value: event.target.value});
        // console.log(this.state.search_value);
    }

    render(){
        return(
            <div className='MyInquiry'>

                <div className='Baike_Header'>
                    <div className='title_ea'>我的咨询</div>
                    <div className="back_search">
                        <Link to="/" className="home-server-item link">
                            <div className='back'>
                                <img className="img" src={require('../../assets/images/back.png')}  alt="返回"/>
                            </div>
                        </Link>
                        <div className="myinquiry_search">
                            <Search history={this.props.history} back="/minquiry" getValue={this.getValue.bind(this)} />
                        </div>
                        <div className='ask_q'>
                            <Consulting back={'/'} search_expert_icon={'28%'} consulting_title={'48%'} info={'提问'} history={this.props.history}/>
                        </div>
                    </div>
                </div>

                <div className='MyInquiry_Blank'></div>

            </div>
        )
    }
}

export default MyInquiry;
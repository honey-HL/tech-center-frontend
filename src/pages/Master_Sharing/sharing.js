import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sharing.css';
import { http } from "../../common/http.js";
import ComHeader from '../../components/com_header/com_header';
import CardHorizontal from '../../components/card_horizontal/card_horizontal'


class Sharing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                },
                {
                    content: '721893743204732047324470324703780183iPhone XS很难修？认证专家告 诉你这些小技巧',
                    src: require('../../assets/images/1.jpg'),
                    view: 72,
                    heart: 134
                }
            ],
            title: '大师分享'
        }
    }
    changeTab = (e) => {}
    componentDidMount(){}
    render(){
        return(
            <div className='background_orange'>
                <ComHeader  from='/' title={this.state.title}/>
                <div className="Redius_Blank">
                {
                this.state.data.map((item, index) => {
                    return(<CardHorizontal key={index} info={item}/>)
                })
                }
                </div>
            </div>
        )
    }
}

export default Sharing;
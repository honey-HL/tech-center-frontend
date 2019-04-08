import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './detail.css';
import { http } from "../../common/http.js";
import ComHeader from '../../components/com_header/com_header';
import CardHorizontal from '../../components/card_horizontal/card_horizontal'


class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            id: '',
            title: '文章详情',
        }
    }
    getArticle = async (id) => {
        let response = await http('/jszx/getarticle', {id:id});
        this.setState({
            id: this.props.location.state.id, 
            content: response.data.jaContent,
            jacId: response.data.jacId,
            jaType: response.data.jaType
        });
        console.log(response);
    }
    componentDidMount(){
        this.getArticle(this.props.location.state.id);
        console.log(this.props.location.state.id);
        window.$mobile.navigationShow(false);
    }
    render(){
        return(
        <div className='background_orange'>
            <ComHeader  from='/' title={this.state.title}/>
            <div className="Redius_Blank">
                <div className="article_content" dangerouslySetInnerHTML={{ __html: this.state.content}}></div>
                <div className="section_bar"></div>
                <div className="relative_article">
                    <div className="relative_title">相关文章</div>

                </div>
            </div>
        </div>
        )
    }
}

export default Detail;
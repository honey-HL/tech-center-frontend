import React, { Component } from 'react';
import './Sharing.css';
import ComHeader from '../../components/com_header/com_header';
import CardHorizontal from '../../components/card_horizontal/card_horizontal'


class Sharing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            back: '/sharing',
            data: [],
            loading: false,
            title: '大师分享'
        }
    }
  
    componentDidMount(){
        window.$mobile.navigationShow(false);
        this.setState({loading: true})
        this.horizontal.loadData()
    }

    render(){
        return(
            <div className='Sharing'>
                <ComHeader history={this.props.history} from='/' title={this.state.title}/>
                <div className="Redius_Blank">
                    <div className='sharing_container'>
                        <CardHorizontal 
                            loading={this.state.loading}
                            back={this.state.back}
                            active_item ={this.state.active_item} 
                            type={3} 
                            ref={el => this.horizontal = el}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Sharing;
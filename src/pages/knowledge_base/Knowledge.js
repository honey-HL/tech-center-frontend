import React, { Component } from 'react';
import { Tabs } from 'antd';
import './Knowledge.css';
import ComHeader from '../../components/com_header/com_header';
import CardHorizontal from '../../components/card_horizontal/card_horizontal'


class Knowledge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style_obj: {
                color:'#666'
            },
            types: [
                {name: '推荐'},
                {name: '屏幕'},
                {name: '主办'},
                {name: '排线'},
                {name: '电池'}
            ],
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
                }
            ],
            title: '知识库'
        }
    }
    changeTab = (e) => {}
    componentDidMount(){
        window.$mobile.navigationShow(false);
    }
    render(){
        const TabPane = Tabs.TabPane;
        return(
            <div className='Knowledge'>
                <ComHeader from='/' title={this.state.title}/>
                <div className="Redius_Blank">
                    <Tabs tabBarStyle={this.state.style_obj} defaultActiveKey="0" onChange={this.changeTab()}>
                        {
                            this.state.types.map((item, index) => {
                                return(
                                    <TabPane tab={item.name} size='small' key={index}>
                                        {
                                            this.state.data.map((info, index1) => {
                                                return(
                                                    <CardHorizontal key={index1} info={info}/>
                                                )
                                            })
                                        }
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Knowledge;
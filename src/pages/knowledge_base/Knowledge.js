import React, { Component } from 'react';
import './Knowledge.css';
import ComHeader from '../../components/com_header/com_header';
import CardHorizontal from '../../components/card_horizontal/card_horizontal'
import { http } from "../../common/http.js";
import { Toast } from 'antd-mobile';


class Knowledge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style_obj: {
                color:'#666'
            },
            back:'/knowledge',
            pageIndex:1,
            types: [],
            data: [],
            active_item: '',
            loading: false,
            title: '知识库'
        }
    }

    getTabsNav = async () => {
        let res = await http('/jszx/classify', {type: 3}); // 分类类型 1 首页展示 2热搜展示 3知识库展示
        let new_types = this.state.types;
        if (res.data) {
            res.data.forEach((item) => {
                new_types.push({name: item.jacName, jacId: item.jacId, active: false})
            })
            new_types[0].active = true;
            this.setState({
                pageIndex:1,
                active_item: new_types[0],
                types: new_types
            })
            console.log(this.state.types)
            this.setState({loading: true})
            this.horizontal.loadData(this.state.types[0])
        } else {
            Toast.info(res.message, 1);
            this.setState({loading: false})
        }
    }

    changeActiveTab = (info) => {
        const items = this.state.types;
        items.forEach((item) => {
            item.active = false;
            if (info.id !== undefined) {
                if ((info.id+'') === (item.id +'')) {
                item.active = true;
                    return
            }
            } else {
                if ((info.jacId === item.jacId)) {
                    item.active = true;
                    return
                }
            }
        })
        this.setState({
            types: items,
            active_item: info
        })
        this.horizontal.loadData(info, 1)
        console.log(this.state);
        console.log(this.state.pageIndex);
    }

    componentWillUnmount() {
    }

    changeTab = (e) => {}
   
    componentDidMount(){
        if (window&&window.$mobile) {
            window.$mobile.navigationShow(false);
        }
        this.getTabsNav()
    }
    render(){
        return(
        <div className='Knowledge'>
            <ComHeader history={this.props.history} from='/' title={this.state.title}/>
            <div className="Redius_Blank">

                <div className="TabsCard">
                    <div className="tab_bar">
                        <div className="tab_bar_box">
                        {
                            this.state.types.map((item, index) => {
                                return(
                                    <div onClick={() => this.changeActiveTab(item)} className={`tab_item ${item.active?'active':''}`} key={index}>{item.name}</div>
                                )
                            })
                        }
                        </div>
                        <div className="tab_content">
                            <CardHorizontal loading={this.state.loading} back={this.state.back} active_item ={this.state.active_item} type={2} ref={el => this.horizontal = el}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}

export default Knowledge;
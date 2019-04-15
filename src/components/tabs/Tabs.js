import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Tabs.css';
import { http } from "../common/http.js";
import { ListView, Toast } from 'antd-mobile';
import {eye, heart, loading_img} from '../common/images';
import { imgPrefix } from '../../src/app-config/config.js';

class Tabs extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageIndex: 1,
            data: [],
            dataSource,
            isLoading: true,
            active_item: '',
            open: true,
            total: '',
            pageSize: 10,
            no_data: false,
            show_loading: false,
            hideAdd: false,
            gutter: 0,
            style_obj: {
                color:'#666'
            },
            types: []
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
            isLoading: true,
            pageIndex: 1,
            data: [],
            types: items,
            active_item: info
        })
        let self = this
        this.timer = setTimeout(() => {
            self.loadData(info)
        }, 100);
        console.log(this.state);
        console.log(this.state.pageIndex);
    }
    getTabsNav = async () => {
        let res = await http('/jszx/classify', {type: this.props.classify});
        let new_types = this.state.types;
        res.data.forEach((item) => {
            new_types.push({name: item.jacName, jacId: item.jacId, active: false})
        })
        this.setState({
            pageIndex:1,
            types: new_types
        })
        console.log(this.state.types)
        this.loadData(this.state.types[0])
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    
    componentDidMount () {
        window.$mobile.navigationShow(true);
        this.getTabsNav()
    }
    
    render(){
        return(
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
                
                    </div>
                </div>
            </div>
        )
    }
}
export default Tabs;

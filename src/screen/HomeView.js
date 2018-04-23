/**
 * Created by PVer on 2018/4/22.
 */
import React from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native'
import ArticleItemView from './ArticleItemView'
import * as homeActions from '../actions/homeActions'

import {connect} from 'react-redux'

class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    componentWillMount() {
        let _that = this;
        _that.props.getHomeList(this.state.page)
    }

    //刷新
    _renderRefresh = () => {
        this.setState({
            page: 0
        });
        this.props.getHomeList(0)
    };

    _onEndReached = () => {
        let page = this.state.page;
        if (!this.props.isEnd) {
            page++;
            this.setState({
                page: page
            });
            this.props.getHomeList(page)
        }
    };


    render() {
        //ReferenceError:Canot find variable ------>引用异常
        const {navigation, message, isLogin, datas, refreshing, banners} = this.props;
        return (
            <FlatList
                data={datas}
                renderItem={(item, index) => <ArticleItemView navigation={navigation} hide={false} item={item} />}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.1}
                onEndReached={this._onEndReached}
                refreshing={refreshing}
                onRefresh={this._renderRefresh}/>
        )
    }
}

export default connect(
    (state) => ({
        isSucc: state.home.isSucc,
        datas: state.home.datas,
        banners: state.home.banners,
        isEnd: state.home.isEnd,
        refreshing: state.home.refreshing,
        likeAction: state.home.likeAction
    }),
    (dispatch) => ({
        getHomeList: (num) => dispatch(homeActions.getHome(num))
    })
)(HomeView)
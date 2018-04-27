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
import * as projectActions from '../actions/projectActions'
import BannerView from './BannerView'
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
        _that.props.getHomeList(this.state.page);
        _that.props.getBanner();
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

    //点赞
    _likeClick = (index, item) => {
        const {isLogin, message, addCollect, cancelCollect} = this.props;
        if(isLogin){
            message('已经登录过了');
        }else{
            message('你还没有登录');
            return
        }

        if (item.collect) {
            cancelCollect(item.id, index);
        } else {
            addCollect(item.id, index);
        }

    };

    render() {
        //ReferenceError:Canot find variable ------>引用异常
        const {navigation, message, isLogin, datas, refreshing, banners} = this.props;
        return (
            <FlatList
                data={datas}
                renderItem={(item, index) => <ArticleItemView likeClick={this._likeClick} navigation={navigation} hide={false} item={item} isLogin={isLogin}/>}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={() => <BannerView navigation={navigation} banners = {banners}/>}
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
        getHomeList: (num) => dispatch(homeActions.getHome(num)),
        getBanner: () => dispatch(homeActions.getBanner()),
        addCollect: (id, index, bool) => dispatch(projectActions.addCollect(id, index, bool)),
        cancelCollect: (id, index) => dispatch(projectActions.cancelCollect(id, index)),
    })
)(HomeView)
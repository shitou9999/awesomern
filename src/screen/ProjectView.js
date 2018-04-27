import React from 'react'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    DeviceEventEmitter
} from 'react-native'

import ProjectItemView from './ProjectItemView'
import * as projectActions from '../actions/projectActions'

/**
 * tab 3
 */
class ProjectView extends React.Component {

    constructor(props) {
        super(props);
        this._likeClick = this._likeClick.bind(this);
        this.state = {
            page: 0
        }
    }

    // componentWillMount = () => this.props.getProjectList(this.state.page);
    componentWillMount() {
        this.props.getProjectList(this.state.page);
    }

    componentWillUpdate() {
        this.props.changeLikeAction();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.likeAction == 1) {
            nextProps.message('添加收藏')
        } else if (nextProps.likeAction == 2) {
            nextProps.message('取消收藏')
        }
    }

    componentDidMount() {
        //当有消息发送时，这就会接收到，并执行相应方法
        this.subscription = DeviceEventEmitter.addListener('reload', this._renderRefresh);
        // DeviceEventEmitter.emit('left', '发送了个通知');
        // this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
        //     alert('收到通知：' + a);
        // });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    //自动加载
    _onEndReached = () => {
        let page = this.state.page;
        if (!this.props.isEnd) {
            page++;
            this.setState({page: page});
            this.props.getProjectList(page)
        }
    };

    // 下拉刷新
    _renderRefresh = () => {
        this.setState({page: 0});
        this.props.getProjectList(0)
    };


    _likeClick(item, index){
        const {isLogin, message, addCollect, cancelCollect} = this.props;
        if(isLogin){
            message('已经登录过了');
        }else{
            message('你还没有登录');
            return
        }

        if (item.collect) {
            cancelCollect(item.id, index)
        } else {
            addCollect(item.id, index, true)
        }
    };

    _keyExtractor = (item, index) => index;

    // FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素
    // renderItem：从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染
    // keyExtractor，用于为给定的item生成一个不重复的key!!!!!若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    render() {
        const {datas, refreshing, backgroundColor, navigation, isLogin}= this.props;

        return (
            <View style={styles.textWarpper}>
                <FlatList
                    data={datas}
                    renderItem={(item,index)=><ProjectItemView item={item}  isLogin={isLogin} navigation={navigation} likeClick={this._likeClick} />}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    refreshing={refreshing}
                    onRefresh={this._renderRefresh}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textWarpper: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});

//会订阅store的状态改变，在每次 store 的 state 发生变化的时候，都会被调用
//mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新
const mapStateToProps = (state, ownProps) => ({
    isSucc: state.project.isSucc,
    datas: state.project.datas,
    isEnd: state.project.isEnd,
    likeAction: state.project.likeAction,
    refreshing: state.project.refreshing
});

const mapDispatchToProps = (dispatch) => ({
    addCollect: (id, index, bool) => dispatch(projectActions.addCollect(id, index, bool)),
    cancelCollect: (id, index) => dispatch(projectActions.cancelCollect(id, index)),
    getProjectList: (page) => dispatch(projectActions.getProjectList(page)),
    changeLikeAction: () => dispatch(projectActions.changeLikeAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)


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
    TouchableNativeFeedback,
    DeviceEventEmitter
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import * as systemActions from '../actions/systemActions'


class SystemView extends React.Component {

    // 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用
    // setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了
    componentWillMount() {
        let _that = this;
        _that.props.getSystemList();
    }

    _itemClick(item) {
        const {navigation} = this.props;
        navigation.navigate('datail', item)
    }

    _renderItem = (({item}) => (
        <TouchableNativeFeedback onPress={()=>this._itemClick(item)}>
            <View style={styles.itemWarpper}>
                <View style={styles.textWarpper}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={styles.childrenWarpper}>
                        {item.children.map((item, index) => this._renderChildrenView(item, index))}
                    </View>
                </View>
                <Icon style={styles.icon} name='ios-arrow-forward' size={20} color='grey'/>
            </View>
        </TouchableNativeFeedback>
    ));

    _renderChildrenView = (item, index) => (
        <Text key={item.id} style={styles.childrenText}>{item.name}</Text>
    );

    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{height:1}}></View>
    );

    // _keyExtractor = (item, index) => index;
    // // keyExtractor={(item, index) => index}

    _keyExtractor = (item, index) => (
        index
    );

    render() {
        const {datas, refreshing} = this.props;

        return (
            <FlatList
                data={datas}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderItemSeparatorComponent}
                keyExtractor={this._keyExtractor}
                refreshing={refreshing}
            />

        );
    }
}
//改变 state 必须 dispatch 一个 action!!!                        store.dispatch()是 View 发出 Action 的唯一方法
// dispatch(action) # ※ 触发 state 改变的【唯一途径】※
//reducer 本质上是根据 action.type 来更新 state 并返回 nextState 的函数
// reducer 必须返回值，否则 nextState 即为 undefined
// 实际上，state 就是所有 reducer 返回值的汇总
// Action Creator => action => store.dispatch(action) => reducer(state, action) => 原 state state = nextState
export default connect(
    (state) => ({
        isSucc: state.system.isSucc,
        datas: state.system.datas,
        refreshing: state.system.refreshing
    }),
    (dispatch) => ({
        getSystemList: () => dispatch(systemActions.getSystemList())
    })
)(SystemView)

const styles = StyleSheet.create({
    itemWarpper: {
        margin: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 5,
        flexDirection: 'row',
    },
    textWarpper: {
        flex: 1,
    },
    childrenWarpper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: 8,
        color: 'grey',
        marginTop: 8,

    },
    childrenText: {
        marginLeft: 8,
        marginVertical: 8,
        fontSize: 10,
    },
    icon: {
        marginRight: 16,
    }
});

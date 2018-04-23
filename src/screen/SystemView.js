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

    _itemClick(item){
        this.props.navigation.navigate('system_datail',item)
    }

    _rederItem = (({item}) => (
        <TouchableNativeFeedback onPress={()=>this._itemClick(item)}>
            <View style={styles.itemWarpper}>
                <View style={styles.textWarpper}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={styles.childrenWarpper}>
                        {item.children.map((item, index) => this._rederChildrenView(item, index))}
                    </View>
                </View>
                <Icon style={styles.icon} name='ios-arrow-forward' size={20} color='grey'/>
            </View>
        </TouchableNativeFeedback>
    ));

    _rederChildrenView = (item, index) => (
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
                renderItem={this._rederItem}
                ItemSeparatorComponent={this._renderItemSeparatorComponent}
                keyExtractor={this._keyExtractor}
                refreshing={refreshing}
            />

        );
    }
}

export default connect(
    (state) => ({
        isSucc: state.system.isSucc,
        datas: state.system.datas,
        refreshing:state.system.refreshing
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

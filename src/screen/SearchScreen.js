/**
 * Created by cyh on 2018/4/27.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    BackHandler
} from "react-native";
import {connect} from 'react-redux'
import HeadBar from './HeadBar'
import * as hotActions from '../actions/hotActions'
const windowWidth = Dimensions.get('window').width;
const colors = [
    "#f44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#2196F3",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FFEB3B",
    "#FF9800",
    "#795548",
    "#9E9E9E",
    "#607D8B"
];

class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this._renderHotItem = this._renderHotItem.bind(this);
        this._renderFriendItem = this._renderFriendItem.bind(this);
        this._renderTitleView = this._renderTitleView.bind(this);
        this.state = {
            searchStr: ''
        };
    }

    /**
     * 同时又两个页面a和b（其中b页面后入栈）监听Android的back键事件，
     * - 如果b页面中的监听函数 return true 的情况下，a页面就不会监听到back键事件了。
     * - 如果b页面中的监听函数 return false 或者没有返回值，a页面也能监听到back事件。
     */
    componentWillMount() {
        this.props.getHotData();
        this.props.getFriendData();
        // BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed);
        // BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        })
    }

    _rightAction = () => {
        if (this.state.searchStr.length > 0) {
            this.props.navigation.navigate("search_result", {k: this.state.searchStr})
        } else {
            alert('。。。')
        }
    };

    // _renderHotItem(item, index) {
    _renderHotItem(item, index) {
        const {navigation} = this.props;
        return <Text onPress={()=>navigation.navigate("search_result",{k:item.name})}
                     style={[styles.hotText,{color:colors[index%colors.length]}]} key={index}>{item.name}</Text>
    };

    _renderFriendItem(item, index) {
        const {navigation} = this.props;
        return <Text onPress={()=> navigation.navigate("detail", item)}
                     style={[styles.hotText,{color:colors[index%colors.length]}]} key={index}>{item.name}</Text>
    };


    // _renderHotItem = (item, index) => (
    //     <Text onPress={()=>this.props.navigation.navigate("search_result",{k:item.name})}
    //           style={[styles.hotText,{color:colors[index%colors.length]}]} key={index}>{item.name}</Text>
    // )

    _renderTitleView() {
        return (
            <TextInput
                style={styles.inputStyle}
                placeholderTextColor='white'
                selectionColor='red'
                underlineColorAndroid='white'
                onChangeText={text =>this.setState({searchStr:text})}
                placeholder='请输入搜索关键词'
            />
        )
    }

    // rightAction={this._rightAction} titleView={this._renderTitleView} navigation={this.props.navigation}
    render() {
        const {backgroundColor, navigation, hot, friend} = this.props;
        return (
            <View style={{flex:1}}>
                <HeadBar
                    rightIcon='md-search'
                    backgroundColor={backgroundColor}
                    navigation={navigation}
                    rightAction={this._rightAction}
                    titleView={this._renderTitleView}
                />

                <View style={styles.hotWrap}>
                    <Text style={{fontSize:16}}>大家都在搜索</Text>
                    <View style={styles.hotContent}>
                        {
                            hot.map((item, index) =>
                                this._renderHotItem(item, index)
                            )
                        }
                    </View>
                </View>
                {/*{} 渲染不出来？*/}
                <View style={[styles.hotWrap,{marginTop:8}]}>
                    <Text style={{fontSize:16}}>常用</Text>
                    <View style={styles.hotContent}>
                        {
                            friend.map((item, index) =>
                                this._renderFriendItem(item, index)
                            )
                        }
                    </View>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    inputStyle: {
        width: windowWidth - 100,
        color: 'white'
    },
    hotWrap: {
        width: windowWidth - 16,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 8,
    },
    hotContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    hotText: {
        marginBottom: 4,
        marginTop: 4,
        marginRight: 16,
        fontSize: 14
    }
});

const mapState = state => ({
    isSucc: state.hot.isSucc,
    hot: state.hot.data,
    friend: state.hot.friendArray
});

const dispatchAction = dispatch => ({
    getHotData: () => dispatch(hotActions.getHotData()),
    getFriendData: () => dispatch(hotActions.getFriendData()),
});

export default connect(mapState, dispatchAction)(SearchScreen)

// export default connect(
//     (state) => ({
//         hot: state.hot.data,
//         friend: state.hot.friendArray
//     }),
//     (dispatch) => ({
//         getHotData: () => dispatch(hotActions.getHotData()),
//         getFriendData: () => dispatch(hotActions.getFriendData()),
//     })
// )(SearchScreen)
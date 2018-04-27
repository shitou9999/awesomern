/**
 * Created by PVer on 2018/4/22.
 */
import React, {Component} from 'react'
import {
    Button,
    Dimensions,
    Image,
    StatusBar,
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'


import HomeView from './HomeView'
import LikeView from './LikeView'
import ProjectView from './ProjectView'
import SystemView from './SystemView'
import HeadBar from './HeadBar'
import globalStyles from '../styles/globalStyles'

const windowWidth = Dimensions.get('window').width;

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this._message = this._message.bind(this);
        this.state = {
            selectedTab: 'home',
            title: '首页'
        }
    }

    _message(message) {
        this.refs.toast.show(message, DURATION.LENGTH_SHORT);
    };


    render() {
        const {navigation, isLogin} = this.props;

        return (
            <View style={{flex: 1,}}>
                <HeadBar navigation={navigation} rightIcon='md-search' rightAcion={()=>navigation.navigate('search')}
                         title={this.state.title} leftIcon='md-menu' isGoBack={false} screenName='DrawerToggle'/>
                <TouchableNativeFeedback
                    onPress={()=>{navigation.navigate('search')}}>
                    <View style={styles.item}>
                        <Text style={{fontSize:20,color:'back'}}>跳转</Text>
                    </View>
                </TouchableNativeFeedback>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-list' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'home', title: '首页'})}>
                        <HomeView navigation={navigation} message={this._message} isLogin={isLogin}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'system'}
                        renderIcon={() => <Icon name='md-book' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-book' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'system', title: '体系'})}>
                        <SystemView navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'project'}
                        renderIcon={() => <Icon name='md-flame' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-flame' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'project', title: '项目'})}>
                        <ProjectView message={this._message} navigation={navigation} isLogin={isLogin}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'like'}
                        renderIcon={() => <Icon name='md-bookmarks' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-bookmarks' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'like', title: '收藏'})}>
                        <LikeView navigation={navigation}/>
                    </TabNavigator.Item>

                </TabNavigator>

                <View style={globalStyles.toast}>
                    <Toast ref="toast" style={{backgroundColor: 'rgba(0,0,0,0.7)'}}/>
                </View>
            </View>
        );
    }
}

const mapState = state => ({
    isLogin: state.loginReducer.isLogin
});

//每个action都会改变state上某个组件对应的属性上的某些属性
//<button onClick={()=>store.dispatch({type:types.INCREMENT})}>+</button>
const dispatchAction = dispatch => ({});

export default connect(mapState, dispatchAction)(HomeScreen)

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 1,
        height: 50,
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//事件的原始派发
// store/actions/counter.js

// import * as types from '../action-types';

//actionCreator 创建action的函数
// export default {
//     increment(){
//         return {type:types.INCREMENT}
//     }
//     ,decrement(){
//         return {type:types.DECREMENT}
//     }
// }

// import actions from '../store/actions/counter';

// <button onClick={()=>store.dispatch(actions.increment())}>+</button>

//bindActionCreators.js
//bindActionCreators.js

// export default function bindActionCreators(actions,dispatch){
//     let newActions = {};
//     for(let attr in actions){
//         newActions[attr] = function(){
//             // actions[attr] => increment(){return {type:types.INCREMENT}}
//             dispatch(actions[attr].apply(null,arguments));
//         }
//     }
//     return newActions;
// }

// import actions from '../store/actions/counter';
// ...
// let newActions = bindActionCreators(actions,store.dispatch);
// ...
// <button onClick={newActions.increment}>+</button>

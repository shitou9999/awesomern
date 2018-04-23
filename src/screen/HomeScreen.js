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
    View
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'


import HomeView from './HomeView'
import LikeView from './LikeView'
import ProjectView from './ProjectView'
import SystemView from './SystemView'

const windowWidth = Dimensions.get('window').width;

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            title: '首页'
        }
    }

    render() {

        const {navigation} = this.props;

        return (
            <View style={{flex: 1,}}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-list' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'home', title: '首页'})}>
                        <HomeView navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'system'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-list' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'system', title: '体系'})}>
                        <SystemView navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'project'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-list' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'project', title: '项目'})}>
                        <ProjectView navigation={navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'like'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray'/>}
                        renderSelectedIcon={() => <Icon name='md-list' size={25}/>}
                        onPress={() => this.setState({selectedTab: 'like', title: '收藏'})}>
                        <LikeView navigation={navigation}/>
                    </TabNavigator.Item>

                </TabNavigator>

                <View style={{width: windowWidth, position: "absolute", left: 0, top: 0}}>
                    <Toast ref="toast" style={{backgroundColor: 'rgba(0,0,0,0.7)'}}/>
                </View>
            </View>
        );
    }
}

const mapState = state => ({});
//每个action都会改变state上某个组件对应的属性上的某些属性
//<button onClick={()=>store.dispatch({type:types.INCREMENT})}>+</button>
const dispatchAction = dispatch => ({});

export default connect(mapState, dispatchAction)(HomeScreen)
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

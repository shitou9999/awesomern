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

let pic={uri: 'http://p4.music.126.net/cq1STvQ6q5b_Eg5grsTjYQ==/3275445147663993.jpg'};

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this._message = this._message.bind(this);
        this.state = {
            selectedTab: 'home',
            title: '首页'
        }
    }

    // 不需要 function 关键字来创建函数
    // 省略 return 关键字
    // 继承当前上下文的 this 关键字

    //只有在组件的render方法被调用时，ref才会被调用，组件才会返回ref。
    // 如果你在调用this.refs.xx时render方法还没被调用，那么你得到的是undefined。
    //每一个 React Native 组件都有一个公开的成员函数 setNativeProps，使用它可以增加或者修改 React Native 组件的属性
    _message(message) {
        this.refs.toast.show(message, DURATION.LENGTH_SHORT);
    };

    //如果箭头函数的代码块多于一句，箭头后面的返回值就要用大括号包起来，并显式写上return

    /********************************************************/
    // 注意，由于箭头后的第一个大括号被解析成代码块，所以如果匿名函数返回一个对象，应该用括号括起来
    // var f = () => ({ name: 'sysuzhyupeng', age: 24 })
    /********************************************************/

//加载网络图片，必须指定图片尺寸
// <Image source={pic} style={{width: 200, height: 200}} />
    //Image组件在加载网络图片的时候，必须要指定宽高!!!!!!!!!!!!!
// <Image source={{uri: 'http://p4.music.126.net/cq1STvQ6q5b_Eg5grsTjYQ==/3275445147663993.jpg'}} style={{width: 200, height: 200}} />

    // 几乎全部的组件都有style这个属性
    //01.style属性可以是一个普通的JavaScript对象
    //02.还可以传入一个数组——在数组中位置居后的样式对象比居前的优先级更高，这样你可以间接实现样式的继承。
//  <Text style={[styles.container,styles.instructions]}>------->重点：后声明的属性会覆盖先声明的同名属性。

    // refs这个点主要用在上级组件调用下级组件的场景，这个场景非常多见。

    render() {
        //解构能让我们从对象或者数组里取出数据存为变量
        const {navigation, isLogin} = this.props;
        // onPress={()=>{navigation.navigate('search')}}>
        return (
            <View style={{flex: 1,}}>
                <HeadBar navigation={navigation} rightIcon='md-search' rightAcion={()=>navigation.navigate('search')}
                         title={this.state.title} leftIcon='md-menu' isGoBack={false} screenName='DrawerToggle'/>
                <TouchableNativeFeedback
                    onPress={()=>{navigation.navigate('theme')}}>
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

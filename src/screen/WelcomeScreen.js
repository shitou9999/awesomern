import React, {Component} from 'react'

import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    StatusBar
} from 'react-native'

import {connect} from 'react-redux'


// import * as themeActions from '../actions/themeActions'
// import RealmUtil from '../utils/RealmUtil'

const windowHeight = Dimensions.get('window').height;

class WelcomeScreen extends Component {
    // 如果是用类的形式定义的组件，我们需要注意事件函数中this的指向问题。
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('home')
        }, 2000)
    }


    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.textWarpper}>
                <StatusBar translucent={true}/>
                <Text style={[styles.text,]}>Android</Text>
            </View>)
    }

    // setState(updater[, callback])，注意此方法是支持回调的
    // state设置更新时的自动合并机制,setState是异步的
    // setState还有第二种形式，使用回调函数而非对象的形式去更新state/
// this.setState((prevState,props)=>({counter:prevState.counter + Math.random()}));
// this.setState((prevState,props)=>({counter:prevState.counter + props.increment}))

}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 50
    },
    textWarpper: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    // changeTheme: color => dispatch(themeActions.changeTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)


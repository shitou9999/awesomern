import AppNavigator from './route'
import React, { Component } from 'react';
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    nav: state.nav,
});
//https://github.com/sujianqingfeng/rn-wanandroid
// http://localhost:8081/index.bundle?platform=android
// adb reverse tcp:8081 tcp:8081
//苹果禁止的是hook系统源码类的操作
class AppNav extends Component<{}> {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
  }

const AppWithNavigationState = connect(mapStateToProps)(AppNav);

export default AppWithNavigationState

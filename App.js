/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import AppWithNavigationState from './src'
import getStore from "./src/store";
import React from 'react';
import { connect, Provider } from "react-redux";

const store = getStore();
//所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。
//建议的方式是使用指定的 React Redux 组件 <Provider> 来 魔法般的 让所有容器组件都可以访问 store，
// 而不必显示地传递它。只需要在渲染根组件时使用即可。

export default class App extends React.PureComponent {
//Provider将store传递给子孙组件
    render() {
        return (
            <Provider store={store}>
              <AppWithNavigationState />
            </Provider>

        );
    }
}


// "babel-jest": "22.4.3",
//     "babel-preset-react-native": "5.0.0",
//     "jest": "22.4.3",
//     "react-test-renderer": "16.3.1"

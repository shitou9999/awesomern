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

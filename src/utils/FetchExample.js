/**
 * Created by cyh on 2018/4/23.
 */
import React from 'react';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';


export default class FetchExample extends React.Component {
//Promise 对象是一个返回值的代理，它允许你为异步操作的成功或失败指定处理方法。
// 这使得异步方法可以像同步方法那样返回值：异步方法会返回一个包含了原返回值的promise 对象来替代原返回值。

//     Promise有两个重要的方法，分别是resolve方法和reject方法。如果异步操作成功，
//     则用resolve方法将Promise对象的状态变为“成功”（即从pending变为resolved）；
//     如果异步操作失败，则用reject方法将状态变为“失败”（即从pending变为rejected）。

    // Fetch 方法会返回一个Promise，一个 Promise，resolve时会回传 Response 对象，
    // 也就是说请求成功，会回传一个Response 对象，这个Response 对象就包含了所有返回结果的信息！

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.movies,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
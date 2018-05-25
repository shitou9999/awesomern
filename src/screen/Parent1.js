/**
 * Created by cyh on 2018/5/8.
 */
import React, {Component}from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
    StatusBar,
    DeviceEventEmitter,
    TouchableNativeFeedback
} from 'react-native'
import Child1 from './Child1'
import Child2 from './Child2'


//PureComponent改变了shouldComponentUpdate，它会自动检查组件是否重新渲染。也就是说，
// 只有当PureComponent检查到props或者state变化时，才会调用render函数，因此不用写额外的检查。
// 还可以减少 Virtual DOM 的生成和比对过程，达到提升性能的目的。
class Parent1 extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            wishes: '',
        }
    }

    // shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，
//setState() 排队更改组件的 state，并通过更新state来告诉 React，该组件及其子组件需要重新渲染。

    //子组件传过来的数据
    _onSend = (msg) => {
        this.setState({wishes: msg})
    };

    render() {
        return (
            <View>
                <View style={styles.statusWarpper}>
                    <StatusBar/>
                </View>
                {/*父组件向子组件通信*/}
                <Child1 child1Title={this.state.wishes}/>
                {/*子组件向父组件通信 也是要通过 props 传递一个函数，子组件调用这个函数，并将子组件需要传递的数据作为参数，传递给父组件*/}
                <Child1
                    child1Title={this.state.wishes}
                    onSend={this._onSend}
                />
                <Child2
                    fromChild1Wishes={this.state.wishes}
                    onSend={this._onSend}
                    value={this.state.wishes}
                />

            </View>

        );
    }


}

const styles = StyleSheet.create({
    statusWarpper: {
        height: 40,
        backgroundColor: 'red'
    },
});


export default Parent1



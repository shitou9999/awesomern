/**
 * Created by cyh on 2018/5/8.
 */
import React, {Component}  from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    TouchableNativeFeedback
} from 'react-native'
import PropTypes from 'prop-types'

class Child1 extends Component {


    _onChildSend = ()=>{
        this.props.onSend('老大被点击了')
    };

    render() {
        const {child1Title} = this.props;
        return (
            <View style = {{height:70}}>
                <Text style={{marginTop:30,backgroundColor:'red'}}>{"我是Child1组件--显示1-->" + child1Title}</Text>
                <Text style={{marginTop:10}}
                    onPress = {this._onChildSend}
                >{"我是Child1组件--显示2-->" + child1Title}</Text>
            </View>
        )
    }


}

Child1.propTypes = {
    child1Title:PropTypes.string,
    onSend:PropTypes.func,
};

Child1.defaultProps = {
    child1Title:'************我是Child1默认值************',
};


export default Child1
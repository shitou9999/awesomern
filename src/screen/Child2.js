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
    TextInput,
    DeviceEventEmitter,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

class Child2 extends Component {

    constructor(props) {
        super(props);
        this._showData = this._showData.bind(this);
        this.state = {
            showValue: "hello",
        }
    }

    _onChildSend = () => {
        this.props.onSend('老二方法')
    };

    render() {
        const {fromChild1Wishes, values} = this.props;
        // {/*onChangeText={(content)=>{this.setState({content})}}*/}
        return (
            <View style={{height:70}}>
                <Text style={{marginTop:10}}
                      onPress={this._onChildSend}
                >{"我是Child2组件--显示2-->" + fromChild1Wishes}</Text>
                <View style={styles.mycontainer}>
                    <TextInput
                        placeholder="请输入用户名"
                        editable={true}
                        multiline={true}
                        value={this.state.showValue}
                        style={styles.inputStyle}
                        onChangeText={this._onChangeText}
                    />

                    <TouchableOpacity onPress={this._showData}>
                        <View style={styles.btn}>
                            <Text style={styles.wordC}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    _onChangeText = (inputData) => {
        this.setState({
            showValue: inputData
        });
    };

    _showData() {
        alert(this.state.showValue);
    }

}

Child2.propTypes = {
    fromChild1Wishes: PropTypes.string,
    values: PropTypes.string,
    onSend: PropTypes.func,
};

Child2.defaultProps = {
    fromChild1Wishes: '************我是Child2默认值************',
};


export default Child2

const styles = StyleSheet.create({
        mycontainer: {
            marginTop: 30,
            flexDirection: "row",
        },
        inputStyle: {
            width: 280,
            height: 50,
            borderColor: "black",
            borderWidth: 1,
            marginLeft: 5,
        },
        btn: {
            width: 85,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
        },
        wordC: {
            color: "white",
            fontSize: 18,
        }
    }
);
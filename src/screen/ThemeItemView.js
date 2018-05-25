/**
 * Created by cyh on 2018/5/4.
 */
import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

const windowWidth = Dimensions.get('window').width;

class ThemeItemView extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state={
            isCheck:props.item.item.check,
            orgColor:props.item.item.color,
            background:'white',
            checkColor:props.item.item.color
        }
    }

    _chooseItem = () => {
        const {changeIndex,checkIndex,item} = this.props;
        const index = item.index;
        changeIndex(index);
    };

    render() {
        const {item} = this.props;
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}
                onPress={this._chooseItem}>
                <View style={{
                    height: windowWidth/3-25,
                    width: windowWidth/3-25,
                    margin:10,
                    borderRadius: (windowWidth/3-25)/2,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:item.check?item.color:'white'}}>
                    <Icon
                        name='md-rose'
                        size={50} color={item.check?'white':item.color}/>
                </View>
            </TouchableNativeFeedback>
        )

    }


}

export default ThemeItemView
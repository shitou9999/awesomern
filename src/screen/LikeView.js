/**
 * Created by PVer on 2018/4/22.
 */
import React from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    TouchableNativeFeedback
} from 'react-native'
const width=Dimensions.get('window').width;

import {connect} from 'react-redux'

class LikeView extends React.Component{


    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback
                    onPress={()=>{navigation.navigate('parent1')}}>
                    <View style={styles.item}>
                        <Text style={{fontSize:20,color:'back'}}>跳转父传子props</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffdeac',
    },
    item: {
        textAlign: 'center',
        backgroundColor: '#cfff87',
        height:50,
        width:width,
    },
});

export default LikeView
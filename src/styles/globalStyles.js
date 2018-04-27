/**
 * Created by cyh on 2018/4/27.
 */
import {
    Dimensions,
    StyleSheet
} from 'react-native'

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    toast: {
        width: width,
        position: 'absolute',
        left: 0,
        top: 0
    }
})
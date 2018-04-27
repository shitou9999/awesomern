/**
 * Created by cyh on 2018/4/26.
 */
import React, {Component} from 'react'
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-easy-toast'
import {connect} from 'react-redux'
const height = Dimensions.get('window').height;

class SlideDrawer extends Component {

    constructor(props) {
        super(props);
        this._iconClick = this._iconClick.bind(this);
        this.state = {
            dialogShow: false,
            dialogText: ''
        }
    }

    _iconClick() {
        const {isLogin, navigation} = this.props;
        if (isLogin) {
            this.setState({
                dialogShow: true,
                dialogAction: 0,
                dialogText: '注销'
            })
        } else {
            navigation.navigate('login')
        }
    };

    render() {

        return (
            <View style={styles.container}>
                {/*头部*/}
                <View style={[styles.head,{backgroundColor:'red'}]}>
                    <TouchableNativeFeedback
                        onPress={this._iconClick}>
                        <Image
                            resizeMode='cover'
                            style={styles.icon}
                            source={require('../res/img/timg.jpg')}
                        />
                    </TouchableNativeFeedback>
                    <Text style={{color:'white',marginTop:4,fontSize:20}}>石头</Text>
                </View>
                {/*item*/}
                <TouchableNativeFeedback
                    onPress={()=>{this.props.navigation.navigate('login')}}>
                    <View style={styles.item}>
                        <Icon name='md-person' size={30}/>
                        <Text style={styles.itemText}>登录or注册</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    onPress={()=>{this.props.navigation.navigate('login')}}>
                    <View style={styles.item}>
                        <Icon name='md-color-palette' size={30}/>
                        <Text style={styles.itemText}>主题</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.navigation.navigate('login')}}>
                    <View style={styles.item}>
                        <Icon name='md-cloud-download' size={30}/>
                        <Text style={styles.itemText}>更新</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.1)'
    },
    head: {
        height: height * 0.3,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 100,
        width: 100,
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: 'white'
    },
    item: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 1,
        height: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 280
    },
    itemText: {
        fontSize: 15,
        marginLeft: 16
    }
});

const mapStateToProps = (state) => ({});

const matDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, matDispatchToProps)(SlideDrawer)
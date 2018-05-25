/**
 * Created by cyh on 2018/4/26.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
    Platform,
    BackHandler
} from 'react-native'
import {Hideo} from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import * as loginActions from '../actions/loginActions'
import Toast, {DURATION} from 'react-native-easy-toast'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LoginScreen extends React.PureComponent {

    //显示有关的--状态机变量
    //父组件传递下来---属性变量
    //与组件逻辑控制相关但与组件显示无关的变量----成员变量或静态变量
    // 1，成员变量----->虽然组件的成员变量可以在任何需要它的地方定义。但还是建议在构造函数中对它们进行定义，这样还可以保证成员变量有初始值。
//注意访问静态变量或静态函数，直接以“类名.变量名（函数名）”的方式访问。不能以“this.变量名（函数名）”的方式访问。

    static staticObject = "ddddddd";  //定义类的静态成员变量

    static staticMethod() {  //定义类的静态成员函数
        console.log("shitou");
    }

    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);
        this._goBack = this._goBack.bind(this);
        this.state = {
            userName: '',
            userPwd: ''
        };
        this.myProperty1 = "sssss";  //成员变量
        this.myProperty1 = 911;  //成员变量
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        })
    }

    componentWillReceiveProps(props) {
        // if (props.isLoginSucc) {
        //     this.refs.toast.show('登陆成功', DURATION.LENGTH_SHORT);
        //     // this._goBack();
        //     this.refs.toast.show(props.loginData, DURATION.LENGTH_SHORT);
        // } else if (props.loginComplate) {
        //     this.refs.toast.show(props.loginData, DURATION.LENGTH_SHORT);
        // }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    _goBack() {
        this.timer = setTimeout(() => this.props.navigation.goBack(), 500)
    }

    userLogin() {
        this.props.login(this.state.userName, this.state.userPwd);
    }


    render() {
        //使用onChangeText写入state，然后从this.state中取出值
        const {isLogin, isLoginSucc, showLoading, loginFlag, navigation} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.inputWarpper}>
                    {/*账号输入框在这里用View包裹以便处理器样式*/}
                    <View style={styles.textInputViewStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid={'transparent'}//去掉下划线
                            placeholder='我是占位符'/>
                    </View>
                    <Hideo
                        iconClass={Icon}
                        iconName={'md-person'}
                        iconColor={'white'}
                        value={this.state.userName}
                        onChangeText={(userName)=> this.setState({userName})}
                        inputStyle={[styles.inputStyle,]}>
                    </Hideo>

                    <Hideo
                        iconClass={Icon}
                        iconName={'md-key'}
                        iconColor={'white'}
                        value={this.state.userPwd}
                        secureTextEntry={true}
                        onChangeText={(userPwd) => this.setState({ userPwd })}
                        inputStyle={[styles.inputStyle]}>
                    </Hideo>
                </View>
                <View style={styles.loginStatus}>
                    <Text style={[styles.loginText,{fontSize:18}]}>登录状态</Text>
                    <Text style={[styles.loginText,{fontSize:18}]}>{showLoading}</Text>
                    <Text style={[styles.loginText,{fontSize:18}]}>{loginFlag}</Text>
                </View>
                {/*background={TouchableNativeFeedback.Ripple('rgba(52,52,52,0.5)', true)}*/}
                <TouchableNativeFeedback
                    key='login'
                    background={TouchableNativeFeedback.SelectableBackground()}
                    onPress={this.userLogin}>
                    <View style={[styles.loginWarpper,]}>
                        <Text style={styles.loginText}>登录</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

export default connect(
    (state) => ({
        showLoading: state.loginReducer.showLoading,
        loginFlag: state.loginReducer.loginFlag,

        isLoginSucc: state.loginReducer.isLoginSucc,
        loginComplate: state.loginReducer.loginComplate,
        isLogin: state.loginReducer.isLogin,
        loginData: state.loginReducer.loginData,
        user: state.loginReducer.user,
    }),
    (dispatch) => ({
        login: (userName, userPwd) => dispatch(loginActions.login(userName, userPwd)),
    }))
(LoginScreen)


//TouchableNativeFeedback触摸反馈
// 目前它只支持一个单独的View实例作为子节点。
// TouchableNativeFeedback.SelectableBackground()会创建一个对象，表示安卓主题默认的对于被选中对象的背景。(?android:attr/selectableItemBackground)
// TouchableNativeFeedback.SelectableBackgroundBorderless() - 会创建一个对象，表示安卓主题默认的对于被选中的无边框对象的背景。
// (?android:attr/selectableItemBackgroundBorderless)。只在Android API level 21+适用。

//3) TouchableNativeFeedback.Ripple(color, borderless) - 会创建一个对象，当按钮被按下时产生一个涟漪状的背景，你可以通过color参数来指定颜色，
// 如果参数borderless是true，那么涟漪还会渲染到视图的范围之外。（参见原生的actionbar buttons作为该效果的一个例子）。
// 这个背景类型只在Android API level 21+适用。

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWarpper: {
        marginTop: 20,
        height: 150,
        width: windowWidth * 0.7
    },
    inputStyle: {
        color: '#464949',
        borderBottomColor: '#e91e63',
        borderBottomWidth: 2,
        marginLeft: 8,
    },
    loginWarpper: {
        borderRadius: windowWidth * 0.1,
        marginTop: 20,
        height: windowWidth * 0.2,
        width: windowWidth * 0.2,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 20,
        color: 'white'
    },
    loginStatus: {
        width: 200,
        height: 90,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //包裹输入框View样式
    textInputViewStyle: {
        //设置宽度减去30将其居中左右便有15的距离
        width: windowWidth - 30,
        height: 45,
        //设置圆角程度
        borderRadius: 18,
        borderColor: 'blue',
        borderWidth: 1,
        //内边距
        paddingLeft: 10,
        paddingRight: 10,
        //外边距
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        //设置相对父控件居中
        alignSelf: 'center',
    },
    //输入框样式
    textInputStyle: {
        width: windowWidth - 30,
        height: 35,
        paddingLeft: 8,
        backgroundColor: '#00000000',
        // alignSelf: 'center',
        //根据不同平台进行适配
        marginTop: Platform.OS === 'ios' ? 4 : 8,
    },

});




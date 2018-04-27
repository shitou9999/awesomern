/**
 * Created by cyh on 2018/4/25.
 */
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableNativeFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

const ANDROID = 50;
const IOS = 44;

class HeadBar extends React.PureComponent {


    _leftClick(isGoBack, screenName) {
        if (isGoBack) {
            const {navigation} = this.props.navigation;
            navigation.goBack();
        } else {
            this.props.navigation.navigate(screenName)
        }
    }

    render() {
        const {rightIcon, backgroundColor} = this.props;
        return (
            <View style={[styles.container,{backgroundColor:backgroundColor}]}>
                <View style={styles.statusWarpper}>
                    <StatusBar {...this.props.statusStyle}/>
                </View>
                <View style={styles.headWarpper}>
                    <View style={styles.leftStyle}>
                        <TouchableNativeFeedback
                            onPress={()=>this._leftClick(this.props.isGoBack,this.props.screenName)}
                            background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",  true )}>
                            <View style={styles.iconWarpper}>
                                <Icon
                                    style={styles.icon}
                                    name={this.props.leftIcon}
                                    size={30}
                                    color='white'
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.titleStyle}>
                        {
                            this.props.titleView ? (
                                this.props.titleView()
                            ) : (
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                                    {this.props.title}
                                </Text>
                            )
                        }
                    </View>

                    <View style={styles.rightStyle}>
                        {
                            rightIcon ? (
                                <TouchableNativeFeedback
                                    onPress={this.props.rightAction}
                                    background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}>
                                    <View style={styles.iconWarpper}>
                                        <Icon
                                            style={styles.icon}
                                            name={this.props.rightIcon}
                                            size={30}
                                            color='white'
                                        >

                                        </Icon>
                                    </View>
                                </TouchableNativeFeedback>
                            ) : (<View/>)
                        }
                    </View>

                </View>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: (Platform.os === 'ios') ? IOS : ANDROID + StatusBar.currentHeight
    },
    statusWarpper: {},
    headWarpper: {
        marginTop: StatusBar.currentHeight / 2 + 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftStyle: {
        margin: 8
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        left: 40,
        right: 40,
    },
    rightStyle: {
        margin: 8
    },
    title: {
        fontSize: 20,
        color: 'white',
        margin: 16,
    },
    iconWarpper: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


// 属性确认仅在开发环境中有效!
//任意类型加上 `isRequired` 来使 prop 不可空
// 不可空的任意类型
// requiredAny: React.PropTypes.any.isRequired, // 不可空的任意类型
HeadBar.propTypes = {
    title: PropTypes.string,
    titleView: PropTypes.func,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    screenName: PropTypes.string,
    isGoBack: PropTypes.bool,
    rightAction: PropTypes.func,
    statusStyle: PropTypes.shape(StatusBarShape),//要求属性是一个指定构成方式的对象
    navigation: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string
};

const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf('default', 'light-content', 'dark-content'),
    translucent: PropTypes.bool
};

//两个验证属性！！！！！
// HeadBar.propTypes = {
//     news: PropTypes.array, //第一个属性
//     page: PropTypes.number, //第二个属性
// };

HeadBar.defaultProps = {
    title: '',
    statusStyle: {
        backgroundColor: "#00000000",
        barStyle: "light-content",
        translucent: true
    },
    leftIcon: "md-arrow-back",
    isGoBack: true,
    backgroundColor: '#E91E63'
};

export default HeadBar




















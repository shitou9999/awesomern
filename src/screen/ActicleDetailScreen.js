/**
 * Created by cyh on 2018/4/25.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    WebView,
    StyleSheet,
    Dimensions,
    BackHandler
}from 'react-native'
import {connect} from 'react-redux'
import Toast, {DURATION} from 'react-native-easy-toast'
import HeadBar from './HeadBar'
import * as acticleDetailActions from '../actions/acticleDetailActions'

const windowWidth = Dimensions.get("window").width;

class ActicleDetailScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this._thisLike = this._thisLike.bind(this)
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        })
    }

    _thisLike() {
        const {addCollect, cancelCollect, isLogin,loginFlag} = this.props;
        const {id, collect} = this.props.navigation.state.params;
        // this.refs.toast.show(loginFlag, DURATION.LENGTH_SHORT);
        if (isLogin) {
            this.refs.toast.show('已经登录成功过了', DURATION.LENGTH_SHORT);
            return
        } else {
            this.refs.toast.show('你没有登录', DURATION.LENGTH_SHORT);
            return
        }
    }


    render() {
        const {navigation, link, url, title, name, collect} = this.props.navigation.state.params;
        const {isLike, backgroundColor} = this.props;

        return (
            <View style={{flex:1}}>
                <HeadBar
                    navigation={navigation}
                    title={title?title:name}
                    rightIcon={(isLike||collect)?'md-heart':'md-heart-outline'}
                    rightAction={this._thisLike}/>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: link?link:url }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
                <View style={{width:windowWidth,position:'absolute',left:0,top:0}}>
                    <Toast ref="toast" style={{backgroundColor:'rgba(0,0,0,0.7)'}}/>
                </View>
            </View>
        );
    }

}

export default connect(
    (state) => ({
        isLike: state.acticleDetailReducer.isLike,
        isLogin: state.loginReducer.isLogin,
        loginFlag: state.loginReducer.loginFlag,
    }),
    (dispatch) => ({
        addCollect: () => dispatch(acticleDetailActions.addCollect()),
        cancelCollect: () => dispatch(acticleDetailActions.cancelCollect())
    })
)(ActicleDetailScreen)

const styles = StyleSheet.create({
    webView: {
        flex: 1,
    }
});
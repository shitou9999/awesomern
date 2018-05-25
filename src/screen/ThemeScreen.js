/**
 * Created by cyh on 2018/5/4.
 */

import React from 'react'
import {SectionList, FlatList, Text, View, BackHandler} from 'react-native'
import {connect} from 'react-redux'
import HeadBar from './HeadBar'
import ThemeItemView from './ThemeItemView'

import * as ColorUtils from '../constants/ColorUtils'
import * as themeActions from '../actions/themeActions'

class ThemeScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            chenkIndex: 1,
            colors: ColorUtils.getThemeColors(props.backgroundColor)
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        })
    }

    _keyExtractor = (item, index) => index;

//函数体内的this对象，就是定义时的this对象，而不是运行时的调用对象。所以箭头函数自带绑定this，在很多地方可以用到
    _changeIndex = (index) => {
        let colors = this.state.colors;
        let themeColors = [];
        for (let i = 0; i < colors.length; i++) {
            // for (i=0;i<colors.length;i++){
            if (i == index) {
                themeColors.push({color: colors[i].color, check: true});
                this.props.changeTheme(colors[i].color);
                RealmUtil.saveThemeColor(colors[i].color)
            } else {
                themeColors.push({color: colors[i].color, check: false})
            }
        }
        this.setState({colors: themeColors})
    };

    render() {
        const {navigation, backgroundColor} = this.props;
        return (
            <View>
                <HeadBar
                    navigation={navigation}
                    backgroundColor={backgroundColor}
                />
                <FlatList
                    columnWrapperStyle={{ alignItems:'center',justifyContent:'center'}}
                    numColumns={3}
                    data={this.state.colors}
                    renderItem={(item) => <ThemeItemView  changeIndex={this._changeIndex}  item={item}/>}
                    keyExtractor={this._keyExtractor}/>
            </View>
        );

    }
}


const mapStateToProps = (state) => ({
    backgroundColor: state.theme.color
});

const mapDispatchToProps = (dispatch) => ({
    changeTheme: color => dispatch(themeActions.changeTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeScreen)
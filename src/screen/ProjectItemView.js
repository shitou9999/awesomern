import PropTypes from "prop-types"
import React from "react"
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    Image
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from 'react-redux'

const windowWidth = Dimensions.get("window").width;
/**
 * tab 3 item
 */
class ProjectItemView extends React.PureComponent {

    // static PropTypes = {
    //     item: PropTypes.object.isRequired,
    //     likeClick: PropTypes.func.isRequired,
    //     navigation: PropTypes.object.isRequired,
    // };
    constructor(props) {
        super(props);
        this._goToDetail= this._goToDetail.bind(this);
    }

    _goToDetail(item){
        const {navigation, isLogin} = this.props;
        const params = {...item, isLogin: isLogin};
        navigation.navigate("detail", params)
    };


    render() {
        // <ProjectItemView item={item}  isLogin={isLogin} navigation={navigation} likeClick={this._likeClick} />}
        const {likeClick, themeColor} = this.props;
        const {item, index} = this.props.item;

        return (
                <TouchableNativeFeedback onPress={()=>this._goToDetail(item)}>
                <View style={styles.itemWarpper}>
                    {/*横*/}
                    <View>
                        <Image style={{ width: 100, height: 180 }} source={{ uri: item.envelopePic }}/>
                    </View>

                    <View style={styles.itemContentWarpper}>
                        {/*竖直*/}
                        <View style={styles.titleWarpper}>
                            {/*竖直*/}
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                            <Text style={styles.desc} numberOfLines={5} ellipsizeMode='tail'>{item.desc}</Text>
                        </View>

                        <View style={styles.bottomWarpper}>
                            {/*横*/}
                            <View style={styles.infoWarpper}>
                                {/*竖直*/}
                                <Text>{item.author}</Text>
                                <Text>{item.niceDate}</Text>
                            </View>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)", true)}
                                onPress={()=>likeClick(item,index)}>
                                <View style={styles.likeWarpper}>
                                    <Icon
                                        style={{ marginHorizontal: 8 }}
                                        name={item.collect?'md-heart':'md-heart-outline'}
                                        size={30}
                                        color={themeColor}
                                        backgroundColor='#00000000'/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>

                </View>
            </TouchableNativeFeedback>
        );
    }
}


ProjectItemView.propTypes = {
    item: PropTypes.object.isRequired,
    likeClick: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default connect((state) => ({
    // themeColor:state.theme.color
}))(ProjectItemView)


const styles = StyleSheet.create({
    itemWarpper: {
        flexDirection: 'row',
        height: 180,
        width: windowWidth - 16,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 8,
    },
    itemContentWarpper: {
        marginHorizontal: 16,
        marginVertical: 8,
        width: windowWidth - 148,
    },
    titleWarpper: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    desc: {},
    bottomWarpper: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    infoWarpper: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    likeWarpper: {
        alignSelf: 'flex-end',
    }
});




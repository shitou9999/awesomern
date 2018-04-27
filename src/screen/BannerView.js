/**
 * Created by cyh on 2018/4/25.
 */
import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    Image
} from 'react-native'

import Carousel from 'react-native-banner-carousel'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;

class BannerView extends React.PureComponent {

    // onPress = {navigation.navigate("detail", params)}
    _renderPage(image,index){
       const {navigation} = this.props;
       const params = {...image,};
       return(
           <TouchableNativeFeedback key = {index} >
               <View style = {{borderRadius:5}}>
                   <Image style={{width:BannerWidth-16,height:BannerHeight,borderRadius:5}} source={{uri:image.imagePath}}/>
                   <View style = {styles.textWarpper}>
                       <Text style = {styles.title}>{image.title}</Text>
                   </View>
               </View>
           </TouchableNativeFeedback>
       );
    }
    // activePageIndicatorStyle={{ backgroundColor: 'back' }}
    render() {
        const {banners} = this.props;
        return (
            <View style = {{margin:8,borderRadius:5,}}>
                <Carousel
                    pageIndicatorStyle={{ backgroundColor: 'white' }}
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth - 16}>
                    {
                        banners[0] ? banners.map((image, index) => this._renderPage(image, index)) : <View></View>
                    }
                </Carousel>
            </View>
        );
    }

}

BannerView.PropTypes = {
    banners: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(BannerView)

const styles = StyleSheet.create({
    textWarpper:{
        position:'absolute',
        top:0,
        left:0,
        height:BannerHeight,
        width:BannerWidth - 16,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    text:{
        justifyContent:'center',
        textAlign:'center',
        fontSize:25,
        color:'white'
    }
});


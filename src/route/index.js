import {DrawerNavigator, StackNavigator} from 'react-navigation';

import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'

//跳转传数据onPress={()=>navigate('Sencond',{ hello: '你好！' })}
//取值 const { params } = this.props.navigation.state;

const NavHome = StackNavigator({
        welcome: {
            screen: WelcomeScreen,
            navigationOptions: {
                header: null
            }
        },
        home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
            // navigationOptions: ({navigation}) => ({ ----->设置默认的导航栏选项
            //     title: `次页面 ${navigation.state.params.hello}`,
            // }),
        },

    }, {
        initialRouteName: 'welcome',
        // initialRouteName设置默认页面
        // initialRouteParams设置默认页面的传值
        // navigationOptions设置默认的导航栏选项
        // paths重新路由设置中的path        设置页面切换模式mode ，设置过渡动画transition等
        navigationOptions: ({navigation, screenProps}) => ({
            gesturesEnabled: true,
            // title设置标题（默认，在没有设置header相关属性下显示）
            //header 设置导航栏头部 接收参数为React Element或者是一个返回React Element的给定HeaderProps参数的方法,如果设置为null,则整个标题栏就不显示了！
            //header我们就可以自定义我们的Header！
            // headerRight 显示在header右边的组件，比如Android中常见的菜单按钮等，都可以通过这一属性设置！
        }),
    }
);


export default NavHome

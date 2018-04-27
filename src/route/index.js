import {DrawerNavigator, StackNavigator} from 'react-navigation';

import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'
import ActicleDetailScreen from '../screen/ActicleDetailScreen'
import SlideDrawer from '../screen/SlideDrawer'
import LoginScreen from '../screen/LoginScreen'
import SearchScreen from '../screen/SearchScreen'

//跳转传数据onPress={()=>navigate('Sencond',{ hello: '你好！' })}
//取值 const { params } = this.props.navigation.state;

const slideDrawer = DrawerNavigator(
    {
        home: {
            screen: HomeScreen,
        }
    }, {
        drawerWidth: 280,
        drawerPosition: 'left',
        contentComponent: SlideDrawer,
        containerOptions: {
            initialRouteName: 'home'
        }
    }
);


const NavHome = StackNavigator({
        welcome: {
            screen: WelcomeScreen,
            navigationOptions: {
                header: null
            }
        },
        home: {
            screen: slideDrawer,
            navigationOptions: {
                header: null
            }
        },
        detail: {
            screen: ActicleDetailScreen,
            navigationOptions: {
                header: null
            }
        },
        login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        search: {
            screen: SearchScreen,
            navigationOptions: {
                header: null
            }
        },

    }, {
        initialRouteName: 'welcome',
        // initialRouteName设置默认页面
        // initialRouteParams设置默认页面的传值
        // navigationOptions设置默认的导航栏选项
        // paths重新路由设置中的path        设置页面切换模式mode ，设置过渡动画transition等
        navigationOptions: ({navigation, screenProps}) => ({
            gesturesEnabled: true,
            //     title: `次页面 ${navigation.state.params.hello}`,
            // title设置标题（默认，在没有设置header相关属性下显示）
            //header 设置导航栏头部 接收参数为React Element或者是一个返回React Element的给定HeaderProps参数的方法,如果设置为null,则整个标题栏就不显示了！
            //header我们就可以自定义我们的Header！
            // headerRight 显示在header右边的组件，比如Android中常见的菜单按钮等，都可以通过这一属性设置！
        }),
    }
);


export default NavHome

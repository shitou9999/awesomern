
import WelcomeScreen from '../screen/WelcomeScreen'
import { DrawerNavigator, StackNavigator } from 'react-navigation';



const NavHome = StackNavigator({
    welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null
        }
    }
},{
    initialRouteName: 'welcome',
    navigationOptions: ({navigation, screenProps}) => ({
        gesturesEnabled: true,
    }),
}
);


export default NavHome

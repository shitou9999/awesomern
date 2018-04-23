import {DrawerNavigator, StackNavigator} from 'react-navigation';

import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'

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
        },

    }, {
        initialRouteName: 'welcome',
        navigationOptions: ({navigation, screenProps}) => ({
            gesturesEnabled: true,
        }),
    }
);


export default NavHome

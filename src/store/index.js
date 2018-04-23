import {createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import getRootReducer from '../reducers'
import AppNavigator from '../route'



const middlewares = [thunk.withExtraArgument(),logger];


const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};
// createStore---->{getState,dispatch,subscribe}
// getState：获取仓库里存储的state
// dispatch：执行动作，更新state(即使state没有变化)
// subscribe：注册更新完state后要执行的cb
export default function getStore(){
    return createStore(
        getRootReducer(navReducer),
        undefined,
        applyMiddleware(...middlewares)
    )
}



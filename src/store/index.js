import {createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import getRootReducer from '../reducers'
import AppNavigator from '../route'


// 维持应用的 state；
// 提供 getState() 方法获取 state；
// 提供 dispatch(action) 方法更新 state；
// 通过 subscribe(listener) 注册监听器;
// 通过 subscribe(listener) 返回的函数注销监听器。


// 使用applyMiddleware挂载中间件
//中间件 传入createStore方法，就完成了store.dispatch()的功能增强
//中间件的次序有讲究 比如logger就一定要放在最后，否则输出结果会不正确
const middlewares = [thunk.withExtraArgument(),logger];

////1、dispatch的触发需要Reducer的接收，所以我们需要定义react-navigation的Reducer：
// （1）定义navReducer，返回导航状态。（跳转State）
const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

// AppNavigator中就是我们定义的react-navigation的StackNavigator。navReducer即为接收跳转状态的Reducer，
// 代码中我们通过获取StackNavigator的Action来返回最新的处理状态。
// createStore---->{getState,dispatch,subscribe}
// getState：获取仓库里存储的state
// dispatch：执行动作，更新state(即使state没有变化)
// subscribe：注册更新完state后要执行的cb

//createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，
// 服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。

export default function getStore(){
    return createStore(
        getRootReducer(navReducer),
        undefined,
        applyMiddleware(...middlewares)
    )
}

// Redux 提供了 applyMiddleware(...middlewares) 来将中间件应用到 createStore。
// applyMiddleware 会返回一个函数，该函数接收原来的 creatStore 作为参数，
// 返回一个应用了 middlewares 的增强后的 creatStore
//*******************不用中间件***************************
// import {createStore} from 'redux';
// import reducers from './reducers/index';
//
// export let store = createStore(reducers);

//*******************用中间件***************************
// import {createStore，applyMiddleware} from 'redux';
// import reducers from './reducers/index';
//
// let createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
// export let store = createStoreWithMiddleware(reducers);

//每个中间件接收 getState & dispatch 作为参数，并返回一个函数，该函数会被传入下一个中间件的 dispatch 方法，并返回一个接收 action 的新函数。

// （1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
// （2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
// （3）Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。
// 只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能------>中间件

// Redux 本身不处理异步行为，需要依赖中间件。结合 redux-actions 使用，Redux 有两个推荐的异步中间件：redux-thunk  redux-promise

























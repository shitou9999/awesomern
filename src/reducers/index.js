import{combineReducers} from 'redux'

import home from './homeReducer'
import system from './systemReducer'
import project from './projectReducer'
import loginReducer from './loginReducer'
import hotReducer from './hotReducer'
import acticleDetailReducer from './acticleDetailReducer'
// import user from './userReducer'
// import search from './searchReducer'
// import like from './likeReducer'
// import collect from './collectReducer'
import theme from './themeReducer'
// import update from './updateReducer'

//一般将各个reducer放在一个名为reducers的文件夹下，并且又该文件夹下的index.js文件统一导出。
// 合并后应该返回一个新的函数
// export default combineReducers({
//     counter
//     ,counter2
// });

export default function getRootReducers(navReducer) {
//一个reducer对应state里的一个属性对应一个组件
    return combineReducers({
        home: home,
        system: system,
        project: project,
        loginReducer: loginReducer,
        hot:hotReducer,
        theme:theme,
        acticleDetailReducer:acticleDetailReducer,
        nav: navReducer
    })
}

/*
import { combineReducers } from 'redux'
//combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，
每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。

 import * as reducers from './reducers'
 const todoApp = combineReducers(reducers)

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp

注意上面的写法和下面完全等价：
export default function todoApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}

 你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价
 const reducer = combineReducers({
     a: doSomethingWithA,
     b: processB,
     c: c
 })
 function reducer(state = {}, action) {
     return {
         a: doSomethingWithA(state.a, action),
         b: processB(state.b, action),
         c: c(state.c, action)
     }
 }

*/
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
// import theme from './themeReducer'
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
        acticleDetailReducer:acticleDetailReducer,
        nav: navReducer
    })

}
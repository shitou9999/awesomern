import{combineReducers} from 'redux'

// import home from './homeReducer'
// import system from './systemReducer'
// import project from './projectReducer'
// import user from './userReducer'
// import hot from './hotReducer'
// import search from './searchReducer'
// import like from './likeReducer'
// import collect from './collectReducer'
// import articleDetail from './articleDetailReducer'
// import theme from './themeReducer'
// import update from './updateReducer'


export default function getRootReducers(navReducer){

    return combineReducers({
        nav:navReducer
    })

}
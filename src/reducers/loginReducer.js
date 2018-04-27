/**
 * Created by cyh on 2018/4/26.
 */
import * as loginTypes from '../constants/loginTypes'
import {handleActions, handleAction} from  'redux-actions'

const defaultStatus = {
    showLoading:false,
    loginFlag:'no_login',
    
    loginData: null,
    registerData:null,
    isLoginSucc: false,
    isLoginLable:false,
    loginComplate:false,
    isLogin:false,
    user:{}
};

/**
 * 用户相关
 */
export default handleActions({
    [loginTypes.USER_LOGIN_ING]:{
        next(state,action){
            return {
                ...state,
                showLoading:true,
                loginFlag:'login_ing',
            }
        }
    },
    [loginTypes.USER_LOGIN_DONE]:{
        next(state,action){
            return {
                ...state,
                showLoading:false,
                loginFlag:'login_ok',

                isLoginSucc: true,
                loginComplate:true,
                isLogin:true,
                loginData: action.payload,
                user:action.payload
            }
        }
    },
    [loginTypes.LOGIN_ERROR]:{
        next(state,action){
            return{
                ...state,
                showLoading:false,
                loginFlag:'login_error'
            }
        }
    },
    [loginTypes.TEST]:{
        next(state,action){
            return{
                ...state,
                showLoading:false,
                isSuccuss:false,
                loginFlag:'login_banner_ok'
            }
        }
    }

},defaultStatus)
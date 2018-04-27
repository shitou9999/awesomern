/**
 * Created by cyh on 2018/4/26.
 */
import {createAction} from 'redux-actions'
import HttpUtil from '../utils/HttpUtil'
import * as loginTypes from '../constants/loginTypes'


function login(userName, userPwd) {
    return dispatch => {
        dispatch(createAction(loginTypes.USER_LOGIN_ING));
        HttpUtil.post('/user/login', {username: userName, password: userPwd})
            .then(res => dispatch(createAction(loginTypes.USER_LOGIN_DONE)(res.data)))
            .catch(res => dispatch(createAction(loginTypes.LOGIN_ERROR)(res.data)))
    }

}

function getBanner() {
    return dispatch =>{
        HttpUtil.get('/banner/json')
            .then(res =>dispatch(createAction(loginTypes.TEST)(res.data)))
    }
}


export {
    login,
    getBanner
}
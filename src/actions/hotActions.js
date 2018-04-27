/**
 * Created by cyh on 2018/4/27.
 */
import {createAction} from 'redux-actions'
import HttpUtil from '../utils/HttpUtil'
import * as appTypes from '../constants/appTypes'

function getHotData() {
    return dispatch =>{
        HttpUtil.get('/hotkey/json')
            .then(res => dispatch(createAction(appTypes.GET_HOT_DONE)(res.data)))
    }
}

function getFriendData() {
    return dispatch =>{
        HttpUtil.get('/friend/json')
            .then(res => dispatch(createAction(appTypes.GET_FRIEND_DONE)(res.data)))
    }
}

export {
    getHotData,
    getFriendData
}
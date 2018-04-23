/**
 * Created by cyh on 2018/4/23.
 */

import {createAction} from 'redux-actions'
import HttpUtil from '../utils/HttpUtil'
import * as systemTypes from '../constants/systemTypes'
//tab 2
function getSystemList(){
    return dispatch =>{
        dispatch(createAction(systemTypes.FETCH_SYSTEM_LIST_DOING)());
        HttpUtil.get('/tree/json')
            .then(res=> dispatch(createAction(systemTypes.FETCH_SYSTEM_LIST_DONE)(res.data)))
    };

}

export {
    getSystemList
}
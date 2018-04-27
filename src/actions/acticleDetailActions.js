/**
 * Created by cyh on 2018/4/27.
 */
import {createAction} from 'redux-actions'
import HttpUtl from '../utils/HttpUtil'
import * as appTypes from '../constants/appTypes'

function addCollect() {
    return dispatch => {
        dispatch(createAction(appTypes.COLLECT_ING));
        HttpUtl.post("/lg/collect/" + id + "/json", {id: id})
            .then(res => dispatch(createAction(appTypes.ADD_COLLECT)))
            .catch(e => {
            })
    }
}

function cancelCollect() {
    return dispatch =>{
        HttpUtl.post("/lg/uncollect_originId/" + id + "/json")
            .then(res => dispatch(createAction(appTypes.CANCEL_COLLECT)))
    }
}

export {
    addCollect,
    cancelCollect
}
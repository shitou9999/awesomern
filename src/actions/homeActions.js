/**
 * Created by cyh on 2018/4/23.
 */
import * as homeTypes from '../constants/homeTypes'
import {createAction} from 'redux-actions'
import HttpUtil from '../utils/HttpUtil'

function getHome(num) {
    return dispatch => {
        dispatch(createAction(homeTypes.FETCH_HOME_LIST_DOING)());
        let result = HttpUtil.get('/article/list/'+num+'/json')
            .then(res=>dispatch(createAction(homeTypes.FETCH_HOME_LIST_DONE)(res.data)))
            .catch(e=>dispatch(createAction(homeTypes.FETCH_HOME_LIST_ERROR)(e)))
    }
}

export {
    getHome
}

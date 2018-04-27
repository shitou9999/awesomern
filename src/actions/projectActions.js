/**
 * Created by cyh on 2018/4/23.
 */
import {createAction} from 'redux-actions'
import HttpUtil from '../utils/HttpUtil'
import  * as projectTypes from '../constants/projectTypes'

// 异步的意思是你应该趁这个时间去做点别的事情
// fetch(`${API_ROOT}/user/${userId}`)
function getProjectList(page) {
    return dispatch => {
        dispatch(createAction(projectTypes.FETCH_PROJECT_LIST_DOING)());
        HttpUtil.get('/article/list/' + page + '/json?cid=294')
        //// 触发SUCCESS的action后在reducer中更新数据
            .then(res => dispatch(createAction(projectTypes.FETCH_PROJECT_LIST_DONE)(res.data)))
    }
}


function addCollect(id, index, bool) {
    return dispatch => {
        dispatch(createAction(projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DOING)());
        HttpUtil.post("/lg/collect/" + id + "/json", {id: id})
            .then(res => dispatch(createAction(projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DONE)({
                index: index,
                bool: bool
            })))
            .catch(e => {
                console.log('发生了错误', e)
            })
    }
}


function cancelCollect(id, index) {
    return dispatch => {
        HttpUtil.post("/lg/uncollect_originId/" + id + "/json")
            .then(res => dispatch(createAction(projectTypes.FETCH_PROJECT_CANCEL_IN_ARTICLE_DONE)({index})));
    }
}

const changeLikeAction = () => (dispatch => dispatch(createAction(projectTypes.CHANGE_LIKE_ACTION)()))


export{
    getProjectList,
    addCollect,
    cancelCollect,
    changeLikeAction
}
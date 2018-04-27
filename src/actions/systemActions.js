/**
 * Created by cyh on 2018/4/23.
 */

import {createAction} from 'redux-actions'
import HttpUtil from '../utils/HttpUtil'
import * as systemTypes from '../constants/systemTypes'

// 同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action
// 操作发起时的 Action
// 操作成功时的 Action
// 操作失败时的 Action
// 除了 Action 种类不同，异步操作的 State 也要进行改造，反映不同的操作状态。
// let state = {
//     isFetching: true,
//     didInvalidate: true,
//     lastUpdated: 'xxxxxxx'
// };

// 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
// 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

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
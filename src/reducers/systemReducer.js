import {
    handleActions
} from 'redux-actions'

import * as systemTypes from '../constants/systemTypes'

const defaultStatus = {
    datas: [],
    isSucc: false,
    details: {},
    refreshing: false,
    likeAction: 0,
    detailRefreshing: false,
};


export default handleActions({
    //加载中
    [systemTypes.FETCH_SYSTEM_LIST_DOING]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false,
                refreshing: true
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                datas: action.payload,
                refreshing: false
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_DETAIL_LIST_DONE]: {
        next(state, action) {
            const data = action.payload;
            const datas = data.datas;
            const id = data.id;

            let details = {...state.details};
            let likeAction = state.likeAction;
            let isEnd = data.curPage >= data.pageCount;

            let detail = {};

            if (data.curPage == 1) {
                detail = {...detail, id, isEnd, datas}
            } else {
                let oldDatas = details[id].datas;
                let newDatas = [...oldDatas, ...datas];
                detail = {...detail, id, isEnd, datas: newDatas}
            }

            details[id] = detail;
            return {
                ...state,
                isSucc: true,
                details: details,
                detailRefreshing: false,
                likeAction: likeAction
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_DETAIL_LIST_DOING]: {
        next(state, action) {
            return {
                ...state,
                detailRefreshing: true
            }
        }
    },
}, defaultStatus)
import * as homeTypes from '../constants/homeTypes';

import { handleActions, handleAction } from 'redux-actions';


const defaultStatus = {
    datas: [],
    banners: [],
    isSucc: false,
    isEnd:false,
    refreshing:false,
    likeAction:0
};
// action是一个普通的javascript对象、reducer是一个普通的方法，在reducer中根据当前的state、接收到的action来生成一个新的state以达到更新状态的目的

export default handleActions({
    [homeTypes.FETCH_HOME_LIST_DOING]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false,
                refreshing:true
            }
        }

    },
    [homeTypes.FETCH_HOME_LIST_DONE]: {
        next(state, action) {

            const data = action.payload
            let datas = state.datas
            let likeAction = state.likeAction

            if(data.curPage ==1){
                datas = data.datas
                likeAction=0
            }else{
                datas = [...datas,...data.datas]
            }

            let isEnd =  data.curPage>data.pageCount

            return {
                ...state,
                isSucc: true,
                isEnd:isEnd,
                refreshing:false,
                datas: datas,
                likeAction:likeAction
            }
        }
    },
    //banner
    [homeTypes.FETCH_HOME_BANNER_DONE]:{
        next(state,action){
            return{
                ...state,
                isSucc:true,
                banners:action.payload
            }
        }
    }
}, defaultStatus)
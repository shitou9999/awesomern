/**
 * Created by cyh on 2018/4/27.
 */
import {handleActions} from 'redux-actions'
import * as appTypes from '../constants/appTypes'

const defaultStatus = {
    data: [],
    isSucc: false,
    friendArray: []
};

export default handleActions({
    [appTypes.GET_HOT_DONE]:{
        next(state,action){
            return{
                ...state,
                data:action.payload
            }
        }
    },
    [appTypes.GET_FRIEND_DONE]:{
        next(state,action){
            return{
                ...state,
                isSucc:true,
                friendArray:action.payload
            }
        }
    }
}, defaultStatus)
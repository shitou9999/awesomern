/**
 * Created by cyh on 2018/4/27.
 */
import {handleActions} from 'redux-actions'
import * as appTypes from '../constants/appTypes'

const defaultStatus = {
    isLike:false
};


export default handleActions({
    [appTypes.ADD_COLLECT]:{
        next(state,action){
            return{
                ...state,
                isLike:true
            }
        }
    },
    [appTypes.CANCEL_COLLECT]:{
        next(state,action){
            return{
                ...state,
                isLike:false
            }
        }
    }
},defaultStatus)
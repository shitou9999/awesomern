import { handleActions } from 'redux-actions'

import * as themeTypes from '../constants/themeTypes'


//redux-actions有两大法宝createAction和handleActions
const defaultStatus = {
   color:'#E91E63'
};

export default handleActions({
    [themeTypes.CHANGE_THEME_COLOR_DONE]: {
        next(state, action) {
            const {color} = action.payload;
            return {
                ...state,
                color:color
            }
        }
    }
}, defaultStatus)
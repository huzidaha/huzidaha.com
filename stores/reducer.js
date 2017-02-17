import { combineReducers } from 'redux'

export default combineReducers({
  fuckyou: (state = { name: 'jerry' }, action) => {
    return {...state}
  }
})

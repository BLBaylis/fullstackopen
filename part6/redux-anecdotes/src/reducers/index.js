import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

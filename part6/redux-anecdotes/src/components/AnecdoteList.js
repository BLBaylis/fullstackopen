import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleClick = (id, content) => {
    dispatch(vote(id))
    dispatch(updateNotification(content))
  }
  return (
    <div>
      <Filter/>
      {anecdotes
        .filter(({ content }) => content.includes(filter))
        .sort((a, b) => a.votes < b.votes ? 1 : -1)
        .map(({ id, content, votes }) =>
          <div key={id}>
            <div>
              {content}
            </div>
            <div>
              has {votes}
              <button onClick={() => handleClick(id, content)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList
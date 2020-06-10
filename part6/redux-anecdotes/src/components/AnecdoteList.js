import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return anecdotes
    .sort((a, b) => a.votes < b.votes ? 1 : -1)
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
  )
}

export default AnecdoteList
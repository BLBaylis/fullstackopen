import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addAnecdote(value))
    setValue('')
  }

  const handleChange = ({ target }) => setValue(target.value)

  return (
    <form onSubmit = {handleSubmit}>
      <h2>create new</h2>
      <div><label>Anecdote: <input onChange = {handleChange} name = "anecdote" value = {value}/></label></div>
      <button type = "submit">create</button>
    </form>
  )
}

export default AnecdoteForm
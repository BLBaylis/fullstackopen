import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(Array(anecdotes.length).fill(0));

  const getRandom = limit => Math.floor(Math.random() * limit);

  const selectRandom = () => setSelected(getRandom(anecdotes.length));
  
  const upvote = () => {
      const newArray = [...voteCount];
      newArray[selected]++;
      setVoteCount(newArray)
  }

  const highestCount = Math.max(...voteCount);
  const indices = voteCount.map((curr, index) => index);
  const highestVoteIndices = indices.filter(index => voteCount[index] === highestCount);

  return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>{voteCount[selected] + " votes"}</p>
            <button onClick = {upvote}>Upvote</button>
            <button onClick = {selectRandom}>Next Anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[highestVoteIndices[0]]}</p>
            <p>{voteCount[highestVoteIndices[0]] + " votes"}</p>
        </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
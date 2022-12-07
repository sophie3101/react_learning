import { useState } from 'react'

const Anecdote = ({anecdote, voteNum}) => {
  console.log('voteNum', voteNum)
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {voteNum} votes</p>
    </div>
  )
}

const DisplayMaxAnecdote = ({votes, anecdotes}) => {
  if (votes.reduce((a, c) => a+ c, 0) !== 0){
    const maxIdx = votes.indexOf(Math.max(...votes))
    const maxVote = votes[maxIdx]
    console.log(anecdotes[maxIdx])
    return (
      <div>
        <h1> Anecdote with most votes </h1>
        <p>{anecdotes[maxIdx]}</p>
        <p>has {maxVote} votes</p>       
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  // const [voteNum, setVoteNum ] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
 
  
  

  const handleVoteClick = () => {
    const copyVotes = votes
    copyVotes[selected] += 1
    setVotes(copyVotes)
    console.log(votes)
  }
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length) )  
  }

 
  return (
    <div>
      <h1> Anecdote of the day </h1>
      {anecdotes[selected]}
      <p>has {votes[selected]}</p>
      <p>
      <button type="button" onClick={handleVoteClick}>vote</button>
      <button type="button" onClick={handleClick}>next anecdote</button>
      </p>
      
      <DisplayMaxAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
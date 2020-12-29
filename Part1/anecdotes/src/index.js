import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({action, text}) => {
  return (
    <>
      <button onClick={action}>{text}</button>
    </>
  )
}

const DisplayAnecedote = ({header, text, numVotes}) => {
  return (
    <div>
      <h1>{header}</h1> 
      <p>{text}</p>
      <p>has {numVotes} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(Array.apply(null, {length: props.anecdotes.length}).map(function() {return 0;})) //init an array with 7 0s
  

  const handleClick = () => { 
    let num = Math.round(Math.random() * 5);
    while(num == selected){
      num = Math.round(Math.random() * 5);
    }
    
    setSelected(num) 
  }
  
  const vote = () => {
    let copy = [... votes]
    copy[selected] += 1
    setVote(copy) //set the state of votes to the newly copied Array 
  }

  
  function checkForTop(){
    let maxIndex = 0

    for (let i = 0; i < votes.length; i++) {
      if(votes[i] > votes[maxIndex])
        maxIndex = i
      console.log(votes[maxIndex])
    }
    
    return maxIndex
  }

  let ourMax = checkForTop()

  return (
    <div>
      <DisplayAnecedote header = "Anecdote of the day" text = {props.anecdotes[selected]} numVotes = {votes[selected]} />
      <Button action = {vote} text = "vote" />
      <Button action={handleClick} text = "next anecdote" />
      <DisplayAnecedote header = "Anecdote with most votes" text = {props.anecdotes[ourMax]} numVotes = {votes[ourMax]} />
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

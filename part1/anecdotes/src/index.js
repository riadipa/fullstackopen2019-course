import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(
      Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );
  const [mostVoted, setMostVoted] = useState(0);

    const handleVotesClick = () => {
        let copy= [...vote];
        copy[selected] += 1;
        setVote(copy);

        let maxValue = copy[0];
        let position = 0;
        for( let i=0; i<copy.length; i++){
            if(maxValue < copy[i]){
                maxValue = copy[i];
                position = i;
            }
        }
        setMostVoted(position);
    }
  
    const handleAnecdotesClick = () =>{
        let nextVal= Math.floor(Math.random() * 10) % 6;
        setSelected(nextVal);
    }

  return (
    <div>
        <h2>Anecdote of the day</h2>
          {props.anecdotes[selected]} 
          <p>has {vote[selected]} votes</p>
           <Button onClick={handleVotesClick} text='vote' />
           <Button onClick={handleAnecdotesClick} text='next anecdote' />
        <h2>Anecdote with most votes</h2>
          {props.anecdotes[mostVoted]} 
          <p>has {vote[mostVoted]} votes</p>
             
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
  <App anecdotes={anecdotes} />, document.getElementById('root'))
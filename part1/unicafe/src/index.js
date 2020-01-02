import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

const Statistic= (props) =>{
  return(
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr> 
    </tbody>   
  )
}

const Statistics = (props) => {
  if ( props.good === 0 && props.neutral=== 0 && props.bad=== 0){
    return(
        <>
            <h1>statistics</h1>
              No feedback given.
        </>
    )
  } 
  return(
      <>
          <h1>statistics</h1>
          <table>
          <Statistic name="good" value= {props.good} /> 
          <Statistic name="neutral" value= {props.neutral} /> 
          <Statistic name="bad" value= {props.bad} /> 
          <Statistic name="all" value= {props.all} /> 
          <Statistic name="average" value= {props.average} /> 
          <Statistic name="positive" value= {props.positive} /> 
          </table>
      </>
  )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        console.log(good)
        setGood(good + 1)
      }

    const handleNeutralClick = () => {
      console.log(neutral)
      setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
      console.log(bad)
      setBad(bad + 1)
    }
      
    const all=() =>{
      return good + neutral + bad
    }

    const average=(props) => {
      return roundOff((good*1 + neutral*0 + bad*(-1))/all())
    }

    const positive=(props) => {
      return roundOff((good*100)/all()) + "%"
    }

    const roundOff=(num)=> {
      return Math.round(num * 100)/100
    }
  
    return (
      <>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text="good" />    
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
        <Statistics good= {good} neutral={neutral} bad={bad} 
                    all= {all()} average={average()} positive= {positive()}/>
        
      </>
    )
  }
ReactDOM.render(<App />, document.getElementById('root'));

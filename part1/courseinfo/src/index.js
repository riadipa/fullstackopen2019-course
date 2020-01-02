import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <>
            <h1>Course Name</h1>
            {props.course}
        </>
    )
}

const Content = (props) => {  
    return (
      <>
      <Part parts= {props.parts[0].name} exercises= {props.parts[0].exercises} />
      <Part parts= {props.parts[1].name} exercises= {props.parts[1].exercises} />
      <Part parts= {props.parts[2].name} exercises= {props.parts[2].exercises} />
      </>
    );
}

const Part = (props) => {
    return (
        <p> {props.name} {props.exercises}</p>
    )
}

const Total = (props) => {
    const sum = () => {
      let total = 0;
      props.parts.forEach(element => {
        total += element.exercise
      })
      return total
    }
    return  <p>Number of exercises {sum()} </p> 
}

const App = () => {
    const course = {
      name:  'Half Stack application development',
      parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14  
        }
      ]
    }
  
    return (
      <>
        <Header course= {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
      </>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))


        
        
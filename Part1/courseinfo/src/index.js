import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  console.log({ course })
  return <p>{course}</p>
}

// wow i screwed up syntax man
const Content = (prop) => {
  prop.parts.forEach(element => {
    console.log(element)
  });
  console.log(prop.parts[0])
  return <>
    <p> {prop.parts[0].name} </p>
    <p> {prop.parts[1].name} </p>
    <p> {prop.parts[2].name} </p>
  </>
}

const Total = (props) => {
  // why does the fragment/root elemeent need to be on the same line like this or else it doesnt detect anything, could use () paren?
  return <>
    <p>Total exercises is </p>
    <p>{props.parts[0].exercises} + {props.parts[1].exercises} +  {props.parts[2].exercises}</p>
  </>
}

const App = () => {

  const course = 'Half Stack application development'

  //array to hold indiv objects
  const parts = [
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

  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts}/>
      <Total parts = {parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
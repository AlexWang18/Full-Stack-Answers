// local host not connecting use code sandbox
import React from 'react';
import ReactDOM from 'react-dom';

const Header = (course) => {

  return <p>{course.thename}</p>

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

const Total = ({parts}) => {
  // why does the fragment/root elemeent need to be on the same line like this or else it doesnt detect anything, could use () paren?
  return <>
    <p>Total exercises is {parts[0].exercises} + {parts[1].exercises} +  {parts[2].exercises} </p>
  </>
}

const App = () => {

  //One large JS object with key value pair properties 
  const course = {

    name: 'Half Stack application development',
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
      }],
  }

  return (
    <div>
      <Header thename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
 // console.log(course)
  const sum = parts.map(p=>p.exercises).reduce((acc , cV) => { //could have done without the map if i provided an inital value to the reduce and used fields
    console.log(cV)
    return acc + cV
  }, );
  return(
    <p><strong>Number of exercises {sum}</strong></p>
  ) 
}

const Part = ({key, name, exercises}) => {
  
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  console.log(parts[0])
  
  return (
    //map each part into a new Part component
    <div>
      {parts.map(p => <Part key = {p.id} name = {p.name} exercises = {p.exercises} />)} 
    </div>
  )
}

const Course = ({course}) => {
  console.log(course.parts)
  return (
    <>
    <Header name = {course.name} /> 
    <Content parts = {course.parts} />
    <Total parts = {course.parts}/>
    </>
  )
  

}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <li key = {course.id}>{<Course course = {course}/>}</li> )} 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
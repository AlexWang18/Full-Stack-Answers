import React from 'react';
import ReactDOM from 'react-dom';

const course = () =>( //short hand
  <>
  <h3>Half Stack application development</h3>
  </>
)

const e1 = ({num}) => (
  
  <>
  
  <h1>
    Fundamentals of React
  </h1>
  <p>
    Num of exercises: 10
  </p>
  </>
)
const e2 = (props) => {
  return (
    <div>
      <h1>
    {props.name}
  </h1>
  <p>
    Num of exercises: {props.num}
  </p>
    </div>
  )
}

const e3 = (props) => (
  
    <>
    <h1>
      {props.name}
    </h1>
    <p>
      Num of exercises: {props.num}
    </p>
    </>
  
)
  

const Content = () => {
  
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
    <course />

    <e1/>
    <e2 name = {part2} num = {exercises2}/>
    <e3 name = {part3} num = {exercises3}/>
    <p>Number of exercies {exercises1+exercises2+exercises3}</p>
    </>
  )
}

ReactDOM.render(<Content/>, document.getElementById("root"))
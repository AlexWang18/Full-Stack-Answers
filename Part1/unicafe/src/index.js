import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}: {value}
      </td>
    </tr>
  )
}
const Statistics = ({ data }) => {
  const total = data[0] + data[1] + data[2]
  const average = (data[0] - data[2]) / total
  const positive = data[0] / total * 100 + "%" //make it a string

  if (total === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='good' value={data[0]} />
        <Statistic text="neutral" value={data[1]} />
        <Statistic text="bad" value={data[2]} />
        <Statistic text="total" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  )
}

//local host not connecting i FORGOT TO STARTTTTTTTTTTT OMFGGGG npm start
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  let arr = [good, neutral, bad, total] //hold counts in array

  const increment = (func, num) => {
    setTotal(total + 1)
    return func(num + 1)
  }

  return ( //pass in function as event handler
    <>
      <h1><strong>Give Feedback</strong></h1>
      <Button handleClick={() => increment(setGood, good)} text="good" />
      <Button handleClick={() => increment(setNeutral, neutral)} text="neutral" />
      <Button handleClick={() => increment(setBad, bad)} text="bad" />
      <h1><strong>Statistics</strong></h1> 
      <Statistics data={arr}></Statistics>
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
//<Button handleClick={() => setGood(good + 1)} text="good" />
  //    <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
 //     <Button handleClick={() => setBad(bad + 1)} text="bad" />
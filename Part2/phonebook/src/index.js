import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ name, number }) => {
  return (
    <li>
      {name}
    </li>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  /* event param is the event that triggers the call to the callback */
  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      date: new Date().toISOString,
      id: persons.length + 1
    }
    //copy the newly created object to new array 
    setPersons(persons.concat(personObj))
    setNewName('') //resets the value of input
  }

  const handleNewP = (event) => {
    console.log(event.target)
    setNewName(event.target.value) //change the state of name
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewP} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <Display key={p.name} name={p.name} />)}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
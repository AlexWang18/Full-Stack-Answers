import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/Phonebook'
import Persons from './components/DisplayPersons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState("000-000-0000")
  const [filter, setFilter] = useState('')
  const [showFilter, setShowed] = useState(false)

  /* event param is the event that triggers the call to the callback */
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(p => p.name === newName)) {
      console.log('not cool');
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObj = {
      name: newName.trim(),
      date: new Date().toISOString,
      number: newNum,
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

  const handleNewNum = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShowed(true)
    console.log(persons.filter(p => p.name.toLowerCase().includes(filter) || p.number.toLowerCase().includes(filter)))
  }

  
  const filterMatch = new RegExp(filter, 'i')
  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <div>
          filter shown with <input value={filter} onChange={handleFilter} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewP} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNewNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={showFilter ?
        persons.filter(p => p.name.match(filterMatch) || p.number.match(filterMatch))
        : persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
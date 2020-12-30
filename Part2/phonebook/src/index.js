import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PersonForm, { Form } from './components/PersonForm'
import Persons from './components/DisplayPersons'
import Filter from './components/Filter'

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

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNum = (event) => {
    setNewNum(event.target.value)
  }

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
    console.log(newName, newNum)
    setPersons(persons.concat(personObj))
    setNewName('') //resets the value of input
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
    setShowed(true)
  }

  const filterMatch = new RegExp(filter, 'i')
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterHandler={handleFilter} />
      <h2>Add a new entry</h2>
      <Form addPerson={addPerson}
        handleName={handleNewName} handleNum={handleNewNum}
        newName={newName} newNum={newNum} />

      <h2>Numbers</h2>
      <Persons persons={showFilter ?
        persons.filter(p => p.name.match(filterMatch) || p.number.match(filterMatch))
        : persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
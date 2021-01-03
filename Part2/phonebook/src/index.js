import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import PersonForm, { Form } from './components/PersonForm'
import Persons from './components/DisplayPersons'
import Filter from './components/Filter'

import BookServices from './components/BookServices'


const App = () => {

  const hook = () => {
    BookServices
      .getAll()
      .then(people => {
        setPersons(people)
        //set the initial state to the response to the get request to the json db.. renders with component
      })
  }
  useEffect(hook, [])

  const [persons, setPersons] = useState([])
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
    BookServices
      .addP(personObj)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
      }
      )

  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
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
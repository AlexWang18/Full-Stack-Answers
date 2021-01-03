import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { Form } from './components/PersonForm'
import Persons from './components/DisplayPersons'
import Filter from './components/Filter'
import { Message, Error } from './components/Notification'

import BookServices from './services/BookServices'

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
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNum = (event) => {
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === '') {
      window.alert('Cannot have a blank name')
      return;
    }
    if (persons.some(p => p.name === newName)) {

      const choice = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (choice) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNum }
        replacePerson(person.id, changedPerson)
      }
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
        setMessage('Added' + addedPerson.name)
      }
      )

  }
  const replacePerson = (id, changedPerson) => {
    BookServices
      .replace(id, changedPerson)
      .then(updatedPerson => {
        console.log(updatedPerson)
        setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
        setMessage('Updated ' + updatedPerson.name)
      })
      .catch(e => {
        console.log(e)
        setError(`Cannot update, information of ${changedPerson.name} has already been removed from server `)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShowed(true)
  }
  const filterMatch = new RegExp(filter, 'i')


  const handleDelete = (id) => { //need to put updating in main component generally, or else it is rough to update the state
    const personTD = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personTD.name}?`)) {
      BookServices
        .deleteP(id)
        .then(() => {
          setPersons(persons.filter(p => p !== personTD))
          setMessage(`Deleted ${personTD.name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message text={message} />
      <Error text={error} />
      <Filter filter={filter} filterHandler={handleFilter} />
      <h2>Add a new entry</h2>
      <Form addPerson={addPerson}
        handleName={handleNewName} handleNum={handleNewNum}
        newName={newName} newNum={newNum} />

      <h2>Numbers</h2>
      <Persons persons={showFilter ?
        persons.filter(p => p.name.match(filterMatch) || p.number.match(filterMatch))
        : persons} handleDelete={handleDelete} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
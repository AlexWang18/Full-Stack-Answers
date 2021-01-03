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
    
    if(newName === ''){
      window.alert('Cannot have a blank name')
      return;
    }
    if (persons.some(p => p.name === newName)) {

      const choice = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if(choice){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNum }
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
      }
      )

  }
  const replacePerson = (id, changedPerson) => {
    BookServices
    .replace(id, changedPerson)
    .then(updatedPerson => {
      console.log(updatedPerson)
      setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
    })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShowed(true)
  }
  const filterMatch = new RegExp(filter, 'i')
  


  const handleDelete = (id) => { //need to put updating in main component generally, or else it is rough to update the state
    const personTD = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${personTD.name}?`)){
      BookServices
      .deleteP(id)
      .then(() => {
        setPersons(persons.filter(p => p !== personTD))
      })
    }
  }

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
        : persons} handleDelete = {handleDelete}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
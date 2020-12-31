import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Form from './components/SearchForm';
import Countries from './components/Country'

const matchSearch = (name, search) => {
  return name.match(new RegExp(search, 'i'))
}

const App = () => {
  const [search, setSearch] = useState('')
  const [showSearch, hasSearched] = useState(false);
  const [countries, setCountries] = useState([]);
  
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('status', response.status)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    hasSearched(true)
  }

  const handleClick = (event) => {
    event.preventDefault();
    setSearch()
  }


  const getResults = () => {
    return countries.filter(c => matchSearch(c.name, search));
  }


  return (
    <>
      <Form newSearch={search} handleSearch={handleSearch} />
      <Countries result={showSearch ? getResults() : countries} handleClick = {handleClick} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));



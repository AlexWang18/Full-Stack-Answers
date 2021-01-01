/* fetching weather is blocking the ui from rendering
and endless rerendering */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Form from './components/SearchForm';
import Countries from './components/Country'

const matchSearch = (name, search) => {
  //if they type in a \ escape character at end it breaks it
  return name.match(new RegExp(search, 'i'))
}


const App = () => {

  const [search, setSearch] = useState('')
  const [showSearch, hasSearched] = useState(false);
  const [countries, setCountries] = useState([]);


  const countryHook = () => { //get the json back from the endpoint
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('status for getting countries', response.status)
        setCountries(response.data)
        console.log(response.data)
      })
  }

  useEffect(countryHook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    //weatherHook(event.target.value)
    hasSearched(true)
  }

  const handleClick = (name) => {
    setSearch(name)
    //change the query to the countries name
  }


  const getResults = () => {
    countries.forEach(c => {
      if (c.name.toUpperCase() === search.toUpperCase()) {
        console.log(c)
        return c;
      }
    })
    return countries.filter(c => matchSearch(c.name, search));
  }


  return (
    <>
      <Form newSearch={search} handleSearch={handleSearch} />
      <Countries result={showSearch ? getResults() : countries} handleClick={handleClick} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));



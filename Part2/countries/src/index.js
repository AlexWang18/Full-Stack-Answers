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
const WEATHERAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;


const App = () => {

  const [search, setSearch] = useState('')
  const [showSearch, hasSearched] = useState(false);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);


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

  const weatherHook = () => {
    //if countries . length == 1

      axios
        .get(`http://api.weatherstack.com/current?access_key=${WEATHERAPIKEY}&query=${countries.capital}`) //tempelate string
        .then(response => {
          console.log(response.data)
          setWeather(response.data)

        })
        .catch(error => {
          console.log('couldnt fetch weather', error)
        })
    
  }

  useEffect(weatherHook, [countries, search]) //only rerender when the dependency search changes

  const handleSearch = (event) => {
    setSearch(event.target.value)
    //weatherHook(event.target.value)
    hasSearched(true)
  }

  const handleClick = (name) => {
    console.log('they clicked to show')
    setSearch(name)
    //weatherHook(name)
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
      <Countries result={showSearch ? getResults() : countries} handleClick={handleClick} weather={weather} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));



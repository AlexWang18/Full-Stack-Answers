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
  //const [weather, setWeather] = useState({});
  
  const countryHook = () => { //get the json back from the endpoint
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('status for getting countries', response.status)
        setCountries(response.data)
        console.log(response.data)
      })
  }

  const getWeather = (query) => { //should i call this here but how could i know there is only 1 shown or in Country
    axios
    .get(`http://api.weatherstack.com/current?access_key=${WEATHERAPIKEY}&query=${query}`) //tempelate string
    .then(response => {
      console.log('status of getting weather', response.status)
      console.log(response.data)
      //setWeather(response.data)
      return response.data
    })
  }

  useEffect(countryHook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    hasSearched(true)
  }

  const handleClick = (name) => {
    console.log('they clicked to show')
    setSearch(name)
  }


  const getResults = () => {
    countries.forEach(c=> {
      if(c.name.toUpperCase() === search.toUpperCase()){
        console.log(c)
        return c;
      }
    })
    return countries.filter(c => matchSearch(c.name, search));
  }


  return (
    <>
      <Form newSearch={search} handleSearch={handleSearch} />
      <Countries result={showSearch ? getResults() : countries} handleClick = {handleClick} handleWeather = {getWeather}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));



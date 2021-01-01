import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WEATHERAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({query}) => {
    const[data, setData] = useState(null)

    const weatherHook = () => {
        //if countries . length == 1
    
          axios
            .get(`http://api.weatherstack.com/current?access_key=${WEATHERAPIKEY}&query=${query}`) //tempelate string, query is the capital
            .then(response => {
              console.log(response.data)
              setData(response.data)
            })
            .catch(error => {
              console.log('couldnt fetch weather', error)
            })
        
      }

      useEffect(weatherHook, [query])
      if(data !== null){
        return (
            <WeatherData data = {data} />
        )
      }
      return (
          <p> couldnt fetch Weather data for {query} </p>
      )
}
      

const WeatherData = ({data}) => {
    return (
        <>
            <h1>Weather in {data.location.name} now</h1>
            <p>{data.current.temperature} temperature</p>
            <img src = {data.current.weather_icons} alt = "weather icon"></img>
        </>
    )
}

export default Weather
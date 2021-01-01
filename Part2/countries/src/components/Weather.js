import React from 'react'

const Weather = ({weather}) => {
    return (
        <>
            <h1>Weather in {weather.location.name} now</h1>
            <p>{weather.current.temperature} temperature</p>
            <p>{weather.current.weather_icons}</p>
        </>
    )
}

export default Weather
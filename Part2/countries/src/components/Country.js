import React from 'react'
import Weather from './Weather';

const Country = ({c, handleClick}) => {
    return (
        <li>
            {c.name} 
            <button onClick = {() => handleClick(c.name)}> 
            show
            </button>
        </li>
    )
}
//thers a logic error weather is initially undefined bc it is pushed into queue and waits for return statements i think
//bc we call the weather component we run it without ever finishing the get request to server
const Solo = ({ single, handleWeather }) => { //refactor into seperate component too long
    const weather = handleWeather(single.name);
    console.log(weather)
    
        return (
            <>
                <h1>{single.name}</h1>
                <p>capital {single.capital}</p>
                <p>population {single.population}</p>
                <h3>languages</h3>
                <ul>
                    {single.languages.map(l => <Language key = {single.alpha3Code} language={l} />)}
                </ul>
             {/*  <img src={single.flag} alt = {single.name + ' flag'}></img>*/}   
                <Weather weather = {weather}/> 
            </>
        )
    
    return (
        <>
            <h1>{single.name}</h1>
            <p>capital {single.capital}</p>
            <p>population {single.population}</p>
            <h3>languages</h3>
            <ul>
                {single.languages.map(l => <Language key = {single.alpha3Code} language={l} />)}
            </ul>

            <img src={single.flag} alt = {single.name + ' flag'}></img>
        </>
    )
}

const Language = ({ language }) => {
    return (
        <li>
            {language.nativeName}
        </li>
    )
}

const Countries = ({ result, handleClick, handleWeather}) => {
    if (result.length > 10) {
        return (
            <p>{result.length} matches, please specify a better filter</p>
        )
    }
    
    else if (result.length === 1) {
        console.log('only one search result');
        return <Solo single = {result[0]} handleWeather = {handleWeather} />
    }
    //b/tw 1-10
    return (
        <ul>
            {result.map(c => <Country key={c.alpha3Code} c={c} handleClick = {handleClick} />)}
        </ul>
    )
}

export default Countries;
import React from 'react'
import Weather from './Weather';


const Countries = ({ result, handleClick }) => {
    if (result.length > 10) {
        return (
            <p>{result.length} matches, please specify a better filter</p>
        )
    }

    else if (result.length === 1) {
        return <Solo single={result[0]} />
    }

    return (
        <ul>
            {result.map(c => <Country key={c.alpha3Code} c={c} handleClick={handleClick} />)}
        </ul>
    )
}

const Solo = ({ single }) => { //only start query if there is a single country displayed 

    return (
        <>
            <h1>{single.name}</h1>
            <p>capital {single.capital}</p>
            <p>population {single.population}</p>
            <h3>languages</h3>
            <ul>
                {single.languages.map(l => <Language key={single.alpha3Code} language={l} />)}
            </ul>
            <img src={single.flag} alt={single.name + ' flag'} width={'200 px'}></img>

            { <Weather query={single.capital} />}

        </>
    )


}

const Country = ({ c, handleClick }) => {
    return (
        <li>
            <strong> {c.name} </strong>
            <button onClick={() => handleClick(c.name)}>
                show
            </button>
        </li>
    )
}

const Language = ({ language }) => {
    return (
        <li>
            {language.nativeName}
        </li>
    )
}

export default Countries;
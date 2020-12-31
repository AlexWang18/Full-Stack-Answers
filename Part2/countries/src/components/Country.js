import React from 'react'
import Button from './Button'

const Country = ({c, handleClick}) => {
    return (
        <li>
            {c.name} <Button handleShow = {handleClick} />
        </li>
    )
}

const Solo = ({ single }) => { //oops was not uppercase was not recognized
    console.log(single)
    return (
        <>
            <h1>{single.name}</h1>
            <p>capital {single.capital}</p>
            <p>population {single.population}</p>
            <h3>languages</h3>
            <ul>
                {single.languages.map(l => <Language language={l} />)}
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

const Countries = ({ result, handleClick}) => {
    if (result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (result.length === 1) {
        console.log('only one term');
        return <Solo single = {result[0]} />
    }

    return (
        <ul>
            {result.map(c => <Country key={c.area} c={c} handleClick = {handleClick} />)}
        </ul>
    )
}

export default Countries;